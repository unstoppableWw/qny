package com.example.tianling.reciver;


import com.example.tianling.WebSocket.handler.UserWebSocketHandler;
import com.example.tianling.common.params.InsertCommentDo;
import com.example.tianling.common.params.PublishLearnArticleDo;
import com.example.tianling.common.utils.RedisUtils;
import com.example.tianling.entity.*;
import com.example.tianling.service.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 消费者
 **/
@Component
public class TopicLikeReciver {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ForumService forumService;

    @Autowired
    private MessageService messageService;


    @RabbitListener(queues = "topic.like")
    public void likeProcess(Map Message) {
        System.out.println("ds");
        try {
            articleService.like(Message.get("userId").toString(),Message.get("articleId").toString());
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @RabbitListener(queues = "topic.not_like")
    public void dislikeProcess(Map Message) {
        System.out.println("sfds");
        try {
            articleService.unlike(Message.get("userId").toString(),Message.get("articleId").toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @RabbitListener(queues = "topic.save_article")
    public void saveProcess(Map Message) {
        System.out.println("dasda");
        try {
            articleService.save(Message.get("userId").toString(),Message.get("articleId").toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    @RabbitListener(queues = "topic.not_save")
    public void not_saveProcess(Map Message) {
        System.out.println("adasd");
        try {
            articleService.cancle_save(Message.get("userId").toString(),Message.get("articleId").toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    @RabbitListener(queues = "topic.followUser")
    public void followProcess(Map Message) {
        System.out.println("followProcess");
        try {
            articleService.follow(Message.get("userId").toString(),Message.get("followId").toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @RabbitListener(queues = "topic.not_followUser")
    public void cancleFollowProcess(Map Message) {
        System.out.println("cancleFollowProcess");
        try {
            articleService.cancle_follow(Message.get("userId").toString(),Message.get("followId").toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @RabbitListener(queues = "topic.subbmit_chat_lrean")
    public void publish_learnArticleProcess(Map Message) {
        System.out.println("publish_learnArticleProcess");
        try {
            PublishLearnArticleDo publishLearnArticleDo = new PublishLearnArticleDo();
            publishLearnArticleDo.setContext(Message.get("context").toString());
            publishLearnArticleDo.setTitle(Message.get("title").toString());
            publishLearnArticleDo.setArctleType(Message.get("arctleType").toString());
            Object imagesObject = Message.get("images");
            if (imagesObject instanceof List) {
                List<String> imagesObjectList = (List<String>) imagesObject;
                publishLearnArticleDo.setArticleImg(imagesObjectList);
                System.out.println("imagesObjectList");
                System.out.println(imagesObjectList);
            } else {
                System.out.println("imagesObjectList is not a List.");
            }

            if(Integer.valueOf(Message.get("arctleType").toString()) ==3){
                forumService.publish_train_content(publishLearnArticleDo,Message.get("userId").toString(),Message.get("roomId").toString());
            }
            else {
                forumService.publish_learn(publishLearnArticleDo,Message.get("userId").toString());
            }

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @RabbitListener(queues = "topic.subbmit_comment")
    public void commnentProcess(Map Message) {
        System.out.println("commnentProcess");
        try {
            InsertCommentDo insertCommentDo = new InsertCommentDo();
            insertCommentDo.setInfo_id(Message.get("info_id").toString());
            insertCommentDo.setContent(Message.get("content").toString());
            insertCommentDo.setReply_user_id(Message.get("reply_user_id").toString());

            articleService.insert_comment(insertCommentDo,Message.get("userId").toString(),Message.get("userName").toString(),Message.get("userImg").toString());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @RabbitListener(queues = "topic.notice_like")
    public void sendLikeMessage(Map<String, Object> message) {
        Integer userId = Integer.valueOf(message.get("userId").toString());
        Integer likeUserId = Integer.valueOf(message.get("likeUserId").toString());
        Integer articleId = Integer.valueOf(message.get("articleId").toString());

        SessionEntity session = messageService.findSession("-1_"+userId);
        if (session == null) {
            messageService.createSession("-1_"+userId);
            session = messageService.findSession("-1_"+userId);
        }
        messageService.createFriend(session.getSessionId(), userId, -1, 2);
        messageService.sendLikeMessage(session.getSessionId(), likeUserId, articleId);
        messageService.updateSession(session.getSessionId(), userId, "新的文章点赞通知", true);
    }

    @RabbitListener(queues = "topic.notice_comment")
    public void sendCommentMessage(Map<String, Object> message) {
        System.out.println(message.toString());
        Integer userId = Integer.valueOf(message.get("userId").toString());
        Integer commentUserId = Integer.valueOf(message.get("commentUserId").toString());
        String content = message.get("content").toString();
        Integer articleId = Integer.valueOf(message.get("articleId").toString());

        SessionEntity session = messageService.findSession("-1_"+userId);
        if (session == null) {
            messageService.createSession("-1_"+userId);
            session = messageService.findSession("-1_"+userId);
        }
        messageService.createFriend(session.getSessionId(), userId, -1, 2);
        messageService.sendCommentMessage(session.getSessionId(), commentUserId, content, articleId);
        messageService.updateSession(session.getSessionId(), userId, "新的文章评论通知", true);
    }

}