package com.example.tianling.controller;

import com.example.tianling.common.annotation.Login;
import com.example.tianling.common.annotation.LoginUser;
import com.example.tianling.common.utils.R;
import com.example.tianling.dao.FeedbackMapper;
import com.example.tianling.entity.ArticleEntity;
import com.example.tianling.entity.CommentEntity;
import com.example.tianling.entity.FeedbackEntity;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.service.ArticleService;
import com.example.tianling.service.CommentService;
import com.example.tianling.service.FeedbackService;
import com.example.tianling.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
public class ComplainController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private UserService userService;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private FeedbackMapper feedbackMapper;

    //用户填写反馈信息type==0为举报，1为反馈
    @Login
    @PostMapping("/feedback")
    @ResponseBody
    public R feedback(@RequestBody FeedbackEntity feedbackEntity, @LoginUser UserEntity user){
        //feedbackEntity接受content、comlainUserId（举报谁，被举报人的id）、type（0为bug问题，1为体验反馈，2为其他意见，3为举报用户）
        feedbackEntity.setUserId(user.getUserId());
        LocalDateTime currentTime = LocalDateTime.now();

        // 定义日期时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 格式化为指定格式的字符串
        String formattedTime = currentTime.format(formatter);
        feedbackEntity.setCreateTime(formattedTime);
        int result = feedbackMapper.insert(feedbackEntity);
        if(result == 1) return R.success();
        else return R.error(405,"操作数据库错误");
    }

    //用户查看自己举报/反馈的信息，查询是否已处理
    @Login
    @PostMapping("/feedback/is_processed.do")
    @ResponseBody
    public R isProcessed(@LoginUser UserEntity user){
        List<FeedbackEntity> list = feedbackService.getInfoByUserId(user);
        return R.success(list);
    }

    //单击list中的实体(id)，返回反馈信息实体/单击feedbackUserId查看被举报用户信息
    @Login
    @PostMapping("/feedback/entity.do")//接收userId;/接收feedbackUserId
    @ResponseBody
    public R feedbackEntity(@RequestBody UserEntity userEntity){
        UserEntity user = userService.getUserByUserId(userEntity.getUserId());
        return R.success(user);
    }

    //查看被举报用户文章
    @Login
    @PostMapping("/feedback/article.do")//接收feedbackUserId
    @ResponseBody
    public R article(@RequestBody UserEntity userEntity){
        List<ArticleEntity> myArticle = articleService.getMyArticle(userEntity.getUserId());
        return R.success(myArticle);
    }

    //查看被举报用户评论
    @Login
    @PostMapping("/feedback/comment.do")//接收feedbackUserId
    @ResponseBody
    public R comment(@RequestBody UserEntity userEntity){
        List<CommentEntity> comment = commentService.findComment(userEntity);
        return R.success(comment);
    }
}
