package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "session")
public class SessionEntity {
    private Integer sessionId;
    private String sessionName;
}
