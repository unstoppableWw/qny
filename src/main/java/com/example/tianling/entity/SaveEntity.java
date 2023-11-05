package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "save_info")
public class SaveEntity {
    private String userId;

    private String articleId;

    private String saveTime;
}
