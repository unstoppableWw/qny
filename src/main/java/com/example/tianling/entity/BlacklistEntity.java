package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "blacklist")
public class BlacklistEntity {
//    @TableId(value = "id", type = IdType.AUTO)
    private Integer primaryUserId;

    private Integer secondaryUserId;

    private Date time;

    public BlacklistEntity(Integer primaryUserId, Integer secondaryUserId, Date time) {
        this.primaryUserId = primaryUserId;
        this.secondaryUserId = secondaryUserId;
        this.time = time;
    }
}
