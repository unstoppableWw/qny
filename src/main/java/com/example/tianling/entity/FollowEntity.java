package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "follow")
public class FollowEntity {
    private Integer userId;

    private Integer followUserId;

    private Date time;
}
