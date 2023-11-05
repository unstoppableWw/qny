package com.example.tianling.common.vo;

import lombok.Data;

import java.util.Date;

@Data
public class SessionVo {
    private Integer userId;
    private String userName;
    private String userImg;
    private Integer sessionId;
    private String content;
    private Date time;
    private Integer unread;
    private Integer type;
}
