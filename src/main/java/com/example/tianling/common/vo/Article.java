package com.example.tianling.common.vo;

import lombok.Data;

import java.util.Date;

@Data
public class Article {
    private Integer userId;     // 发表文章的用户id
    private String userName;    // 用户名称
    private String userImg;     // 用户头像url
    private Integer articleId;  // 文章id
    private String title;       // 文章标题
    private String content;     // 文章内容
    private Date createTime;    // 创建时间
    private Integer likeNum;    // 点赞数量
    private Integer saveNum;    // 收藏数量
    private Integer viewNum;    // 浏览数量
    private String articleImg;
}
