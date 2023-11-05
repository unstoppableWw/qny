package com.example.tianling.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.tianling.common.annotation.Login;
import com.example.tianling.common.annotation.LoginUser;
import com.example.tianling.common.params.*;
import com.example.tianling.common.utils.R;
import com.example.tianling.common.utils.Check;
import com.example.tianling.common.vo.ArticleVo;
import com.example.tianling.common.vo.myHeInfoVo;
import com.example.tianling.entity.CommentEntity;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.service.ArticleService;
import org.json.JSONException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
public class ArticleController {
    @Autowired
    private  RabbitTemplate rabbitTemplate ;//使用RabbiTeme,提供了接受发送方法
    @Autowired
    private ArticleService articleService;

    //加载帖子页，需要加载这个帖子，和分页加载评论
    @Login
    @PostMapping(value="/article")
    @ResponseBody
    public R article(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String articleId = paramsJSONObject.getString("articleId");
        String type = paramsJSONObject.getString("type");
        String userId = Integer.toString(user.getUserId());
        ArticleVo newArticle = articleService.article_conment(articleId,userId,1);
        return R.success(newArticle);
    }
    //加载一些我的和作者的名字和头像
    @Login
    @PostMapping(value="/article/myHeInfo.do")
    @ResponseBody
    public R myHeInfo(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String hisArticleId = paramsJSONObject.getString("hisArticleId");
        UserEntity hisInfo = articleService.getHisImg(hisArticleId);
        return R.success(new myHeInfoVo(hisInfo.getUserImg(),hisInfo.getUserName(), user.getUserImg(), user.getUserName(),user.getUserId().toString()));
    }

    //下滑加载评论
    @Login
    @PostMapping(value="/article/article_comment.do")
    @ResponseBody
    public R load_comment(@RequestBody ArticleCommentDo articleCommentDo) {
        String articleId = articleCommentDo.getArticleId();
        Integer pageNum = Integer.parseInt(articleCommentDo.getPageNum());
        Page<CommentEntity> get_com = articleService.get_conment(articleId,pageNum);
        return R.success(get_com);
    }
    @Login
    //插入评论
    @RequestMapping(value="/article/insert_comment.do",method = RequestMethod.POST)
    @ResponseBody
    public R insert_comment(@RequestBody InsertCommentDo insertCommentDo,@LoginUser UserEntity user) throws JSONException, IOException {

        String userId = Integer.toString(user.getUserId());
        String userImg = user.getUserImg();
        String userName = user.getUserName();

        Check check = new Check();
        int textCheack = check.text(insertCommentDo.getContent());
        if(textCheack == 2){
            return new R(200,"评论涉嫌违规");
        }
        try {
            Map<String,Object> map = new HashMap<>();
            map.put("userId",userId);
            map.put("userImg",userImg);
            map.put("userName",userName);
            map.put("info_id",insertCommentDo.getInfo_id());
            map.put("content",insertCommentDo.getContent());
            map.put("reply_user_id",insertCommentDo.getReply_user_id());
            rabbitTemplate.convertAndSend("topicExchangeSubbmit","topic.subbmit_comment",map);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new R(200,"评论成功");
    }

    //关注
    @Login
    @RequestMapping(value="/article/follow.do",method = RequestMethod.POST)
    @ResponseBody
    public R follow(@RequestBody String params,@LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String followId = paramsJSONObject.getString("followId");
        String userId = user.getUserId().toString();
        try {
            Map<String,Object> map = new HashMap<>();
            map.put("userId",userId);
            map.put("followId",followId);
            rabbitTemplate.convertAndSend("topicExchangeClike","topic.followUser",map);
        }catch (Exception e){
            e.printStackTrace();
        }
        return  new R(200,"关注成功");
    }


    //取消关注
    @Login
    @RequestMapping(value="/article/cancle_follow.do",method = RequestMethod.POST)
    @ResponseBody
    public R cancle_follow(@RequestBody String params,@LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String followId = paramsJSONObject.getString("followId");
        String userId = user.getUserId().toString();
        try {
            Map<String,Object> map = new HashMap<>();
            map.put("userId",userId);
            map.put("followId",followId);
            rabbitTemplate.convertAndSend("topicExchangeClike","topic.not_followUser",map);
        }catch (Exception e){
            e.printStackTrace();
        }
        return  new R(200,"取消关注");
    }
    //点赞
    @Login
    @RequestMapping(value="/article/like.do",method = RequestMethod.POST)
    @ResponseBody
    public R like(@RequestBody String params,@LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String articleId = paramsJSONObject.getString("articleId");
        String userId = Integer.toString(user.getUserId());
        try {
            Map<String,Object> map = new HashMap<>();
            map.put("userId",userId);
            map.put("articleId",articleId);
            rabbitTemplate.convertAndSend("topicExchangeClike","topic.like",map);
        }catch (Exception ignored){

        }
        return  new R(200,"点赞成功");
    }

    //取消关注
    @Login
    @RequestMapping(value="/article/cancle_like.do",method = RequestMethod.POST)
    @ResponseBody
    public R dislike(@RequestBody String params,@LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String articleId = paramsJSONObject.getString("articleId");
        String userId = Integer.toString(user.getUserId());
        try {
            Map<String,Object> map = new HashMap<>();
            map.put("userId",userId);
            map.put("articleId",articleId);
            rabbitTemplate.convertAndSend("topicExchangeClike","topic.not_like",map);
        }catch (Exception ignored){

        }
        return  new R(200,"取消成功");
    }

    //收藏
    @Login
    @RequestMapping(value="/article/save.do",method = RequestMethod.POST)
    @ResponseBody
    public R save(@RequestBody String params,@LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String articleId = paramsJSONObject.getString("articleId");
        String userId = Integer.toString(user.getUserId());
        try {
            Map<String,Object> map = new HashMap<>();
            map.put("userId",userId);
            map.put("articleId",articleId);
            rabbitTemplate.convertAndSend("topicExchangeClike","topic.save_article",map);
        }catch(Exception e){
            e.printStackTrace();
        }
        return new R(200,"收藏成功");
    }

    //取消收藏
    @Login
    @RequestMapping(value="/article/cancle_save.do",method = RequestMethod.POST)
    @ResponseBody
    public R cancle_save(@RequestBody String params,@LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String articleId = paramsJSONObject.getString("articleId");
        String userId = Integer.toString(user.getUserId());
        try {
            Map<String,Object> map = new HashMap<>();
            map.put("userId",userId);
            map.put("articleId",articleId);
            rabbitTemplate.convertAndSend("topicExchangeClike","topic.not_save",map);
        }catch(Exception e){
            e.printStackTrace();
        }
        return new R(200,"取消收藏");
    }
}
