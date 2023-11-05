package com.example.tianling.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.tianling.common.annotation.Login;
import com.example.tianling.common.annotation.LoginUser;
import com.example.tianling.common.params.DownLoadDo;
import com.example.tianling.common.params.SearchDo;
import com.example.tianling.common.utils.R;
import com.example.tianling.common.vo.Article;
import com.example.tianling.common.vo.forumVo;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.service.ForumService;
import com.example.tianling.service.QiniuService;
import org.json.JSONException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Controller
public class ForumController {

    @Autowired
    private QiniuService qiniuService;
    @Autowired
    private ForumService forumService;
    @Autowired
    private RabbitTemplate rabbitTemplate ;

    @Login
    @PostMapping("/forum")
    @ResponseBody
    public R getVideoList(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject jsonObject = JSON.parseObject(params);
        Integer type = jsonObject.getInteger("type");
        Integer page = jsonObject.getInteger("page");

        List<Map<String, Object>> list = new ArrayList<>();

        IPage<Article> articleIPage= forumService.load(page,type);
        for (Article article: articleIPage.getRecords()) {
            Map<String, Object> map = new HashMap<>();
            map.put("aticleId", article.getArticleId());
            map.put("url", article.getArticleImg());
            map.put("cover", qiniuService.getImg(article.getArticleImg()));
            Boolean like = forumService.is_follow_like_save(user.getUserId().toString(),article.getArticleId().toString(),"like");
            map.put("follow", like);
            map.put("loveCount", article.getLikeNum());
            map.put("shareCount", article.getViewNum());
            map.put("userId", article.getUserId());
            map.put("name", article.getUserName());
            map.put("content", article.getContent());
            list.add(map);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("page", page);
        result.put("data", list);

        return R.success(result);
    }


    @Login
    @PostMapping(value="/search.do")
    @ResponseBody
    public R search_load(@RequestBody SearchDo searchDo,@LoginUser UserEntity user) {
        Integer page = Integer.parseInt(searchDo.getPage());
        Integer type = Integer.parseInt(searchDo.getTypeNum());
        String keyword = searchDo.getKeyword();

        List<Map<String, Object>> list = new ArrayList<>();
        IPage<Article> articleIPage= forumService.search(page,type, keyword);
        for (Article article: articleIPage.getRecords()) {
            Map<String, Object> map = new HashMap<>();
            map.put("aticleId", article.getArticleId());
            map.put("url", article.getArticleImg());
            map.put("cover", qiniuService.getImg(article.getArticleImg()));
            Boolean like = forumService.is_follow_like_save(user.getUserId().toString(),article.getArticleId().toString(),"like");
            map.put("follow", like);
            map.put("loveCount", article.getLikeNum());
            map.put("shareCount", article.getViewNum());
            map.put("userId", article.getUserId());
            map.put("name", article.getUserName());
            map.put("content", article.getContent());
            list.add(map);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("page", page);
        result.put("data", list);

        return R.success(result);
    }

    //发贴，参数保存参数对象，插入数据库
    @Login
    @RequestMapping(value="/article/publish_learnArticle.do",method = RequestMethod.POST)
    @ResponseBody
    public R publish_learnArticle(@RequestParam("file") MultipartFile file,@RequestParam("context") String context,@RequestParam("title") String title,@RequestParam("arctleType") String arctleType,@LoginUser UserEntity user) throws JSONException, IOException {
        Map<String, Object> map = new HashMap<>();
        String userId = user.getUserId().toString();
        List<String> ls = new ArrayList<>();
        String str = qiniuService.uploadFile(file);
        ls.add(str);
        System.out.println(str);
        try {
            Map<String,Object> new_map = new HashMap<>();
            new_map.put("userId",userId);
            new_map.put("context",context);
            new_map.put("title",title);
            new_map.put("arctleType",arctleType);
            new_map.put("time","2022");
            new_map.put("images",ls);
            rabbitTemplate.convertAndSend("topicExchangeSubbmit","topic.subbmit_chat_lrean",new_map);
        }catch (Exception e){
            e.printStackTrace();
        }
        map.put("arctle_state", 200);
        return R.success(map);
    }
}
