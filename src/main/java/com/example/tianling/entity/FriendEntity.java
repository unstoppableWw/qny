package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "friend")
public class FriendEntity {
    private Integer userId;
    private Integer friendId;
    private Integer sessionId;
    private String content;
    private Date time;
    private Integer unread;
    private Integer type;
}