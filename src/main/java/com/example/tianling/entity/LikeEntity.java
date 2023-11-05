package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "like_info")
public class LikeEntity {
    private String userId;

    private String article_id;
}
