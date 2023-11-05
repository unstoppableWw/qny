package com.example.tianling.common.vo;

import lombok.Data;

import java.util.Date;

@Data
public class NoticeMessageVo {
    private Integer messageId;
    private Integer userId;
    private String userName;
    private String userImg;
    private String content;
    private Date time;
    private Integer type;
}
