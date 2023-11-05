package com.example.tianling.common.vo;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.tianling.entity.ArticleEntity;
import com.example.tianling.entity.CommentEntity;
import lombok.Data;

@Data
public class ArticleVo {
    private ArticleEntity articleContent;
    private Page<CommentEntity> commentList;
    private Boolean IsFollow;
    private Boolean IsLike;
    private Boolean IsSave;

    public ArticleVo(ArticleEntity articleContent, Page<CommentEntity> commentList, Boolean isFollow, Boolean isLike, Boolean isSave) {
        this.articleContent = articleContent;
        this.commentList = commentList;
        IsFollow = isFollow;
        IsLike = isLike;
        IsSave = isSave;
    }
}
