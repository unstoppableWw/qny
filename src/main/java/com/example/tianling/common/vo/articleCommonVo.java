package com.example.tianling.common.vo;

import lombok.Data;

import java.util.Date;

@Data
public class articleCommonVo {
    private Integer userId;
    private String userName;
    private String userImg;
    private Integer articleId;
    private String title;
    private String content;
    private Date createTime;
    private Integer likeNum;
    private Integer saveNum;
    private Integer viewNum;
    private String type;
    private Integer maxNumber;
    private String area;
    private String preference;
    private Date startTime;
    private String articleImg;
    private Integer like;
    private Integer save;
}
