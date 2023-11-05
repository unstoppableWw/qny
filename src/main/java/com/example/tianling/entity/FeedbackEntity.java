package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName(value = "feedback")
public class FeedbackEntity {
    @TableId(value = "feedback_id", type = IdType.AUTO)
    private Integer feedbackId;

    private Integer userId;

    private String content;

    private Integer complainUserId;

    private String createTime;

    private Integer type;

    private Integer isProcessed;

    private String reflectImgs;
}
