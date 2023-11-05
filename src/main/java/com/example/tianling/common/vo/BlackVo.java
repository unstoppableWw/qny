package com.example.tianling.common.vo;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.tianling.entity.ArticleEntity;
import com.example.tianling.entity.CommentEntity;
import lombok.Data;

@Data
public class BlackVo {
    private Integer userId;
    private String userName;
    private String userImg;
    private String description;
}
