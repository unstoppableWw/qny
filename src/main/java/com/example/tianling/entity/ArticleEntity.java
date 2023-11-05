package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "article")
public class ArticleEntity {
    @TableId(value = "article_id", type = IdType.AUTO)
    private Integer articleId;

    private String userId;

    private String title;

    private String type;

    private String content;

    private String articleImg;

    private String createTime;

    private String viewNum;

    private String likeNum;

    private String saveNum;

}
