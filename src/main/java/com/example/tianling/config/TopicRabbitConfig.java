package com.example.tianling.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
这是一个主题匹配交换机的配置，根据主题词的不同匹配不同的队列
 队列一：1.点赞 2.取消点赞 3 收藏 4 取消收藏 5 关注 6 取消关注
 **/

@Configuration
public class TopicRabbitConfig {
    //绑定键
    public final static String like = "topic.like";
    public final static String dislike = "topic.not_like";
    public final static String save = "topic.save_article";
    public final static String not_save = "topic.not_save";
    public final static String follow = "topic.followUser";
    public final static String not_follow = "topic.not_followUser";
    public final static String subbmit = "topic.subbmit_chat_lrean";
    public final static String subbmit_comment = "topic.subbmit_comment";

    public final static String notice_like = "topic.notice_like";
    public final static String notice_comment = "topic.notice_comment";

    //创建相应的队列
    //关注队列
    @Bean
    public Queue firstQueue() {
        return new Queue(like,true);
    }
    //取消关注队列
    @Bean
    public Queue secondQueue() {
        return new Queue(dislike,true);
    }
    //收藏队列
    @Bean
    public Queue thirdQueue() {
        return new Queue(save,true);
    }

    //取消收藏队列
    @Bean
    public Queue fourthQueue() {
        return new Queue(not_save,true);
    }

    //关注队列
    @Bean
    public Queue fifthQueue() {
        return new Queue(follow,true);
    }

    //取消关注队列
    @Bean
    public Queue sixQueue() {
        return new Queue(not_follow,true);
    }

    @Bean
    public Queue SubbmitQueue() {
        return new Queue(subbmit,true);
    }

    @Bean
    public Queue conmmentQueue() {
        return new Queue(subbmit_comment,true);
    }


    @Bean
    public Queue noticeLike() { return new Queue(notice_like, true); }

    @Bean
    public Queue noticeComment() { return new Queue(notice_comment, true); }

    //创建交换机
    @Bean
    TopicExchange exchange() {
        return new TopicExchange("topicExchangeClike");
    }

    @Bean
    TopicExchange exchangeSubbmit() {
        return new TopicExchange("topicExchangeSubbmit");
    }

    @Bean
    TopicExchange exchangeMatch() { return new TopicExchange("topicExchangeMatch"); }

    @Bean
    TopicExchange exchangeNotice() { return new TopicExchange("topicExchangeNotice"); }


    @Bean
    Binding bindingExchangeNoticeLike() { return BindingBuilder.bind(noticeLike()).to(exchangeNotice()).with(notice_like); }

    @Bean
    Binding bindingExchangeNoticeComment() { return BindingBuilder.bind(noticeComment()).to(exchangeNotice()).with(notice_comment); }

    //将firstQueue和topicExchangeClike绑定,而且绑定的键值为topic.like
    //这样只要是消息携带的路由键是topic.like,才会分发到该队列
    @Bean
    Binding bindingExchangeMessage() {
        return BindingBuilder.bind(firstQueue()).to(exchange()).with(like);
    }

    //将secondQueue和topicExchangeClike绑定,而且绑定的键值为用上通配路由键规则
    // 这样只要是消息携带的路由键是dislike,都会分发到该队列
    @Bean
    Binding bindingExchangeMessage2() {
        return BindingBuilder.bind(secondQueue()).to(exchange()).with(dislike);
    }


    // 这样只要是消息携带的路由键是save,都会分发到该队列
    @Bean
    Binding bindingExchangeMessage3() {
        return BindingBuilder.bind(thirdQueue()).to(exchange()).with(save);
    }


    // 这样只要是消息携带的路由键是not_save,都会分发到该队列
    @Bean
    Binding bindingExchangeMessage4() {
        return BindingBuilder.bind(fourthQueue()).to(exchange()).with(not_save);
    }

    // 这样只要是消息携带的路由键是follow,都会分发到该队列
    @Bean
    Binding bindingExchangeMessage5() {
        return BindingBuilder.bind(fifthQueue()).to(exchange()).with(follow);
    }

    // 这样只要是消息携带的路由键是not_follow,都会分发到该队列
    @Bean
    Binding bindingExchangeMessage6() {
        return BindingBuilder.bind(sixQueue()).to(exchange()).with(not_follow);
    }

    @Bean
    Binding bindingExchangeMessageSubbmit() {
        return BindingBuilder.bind(SubbmitQueue()).to(exchangeSubbmit()).with(subbmit);
    }
    @Bean
    Binding bindingExchangeMessageSubbmitCommnet() {
        return BindingBuilder.bind(conmmentQueue()).to(exchangeSubbmit()).with(subbmit_comment);
    }
}