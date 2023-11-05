package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "notice_message")
public class NoticeMessageEntity {
    private Integer messageId;
    private Integer sessionId;
    private Integer userId;
    private String content;
    private Integer articleId;
    private Date time;
    private Integer type;
}
