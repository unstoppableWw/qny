package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "user")
public class UserEntity {
    @TableId(type = IdType.AUTO)
    private Integer userId;

    private String userName;

    private String  userImg;

    private String password;

    private String mobile;

    private Integer sex;

    private String area;

    private String description;

    private Integer followNum;

    private Integer fansNum;

    private Integer articleNum;
}
