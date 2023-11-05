package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "chat_message")
public class ChatMessageEntity {
    @TableId(type = IdType.AUTO)
    private Integer messageId;
    private Integer sessionId;
    private Integer fromId;
    private Integer toId;
    private String content;
    private Integer status;
    private Date time;
    private Integer type;
}
