package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;


@Data
@TableName(value = "user_privacy")
public class UserPrivacyEntity {
    @TableId(value = "user_id")
    private Integer userId;

    private Integer viewMyPosts;

    private Integer viewMyFavorites;

    private Integer allowPrivateMessages;

    private Integer displayProfile;

    private Integer displayLocation;

}