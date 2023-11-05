package com.example.tianling.common.vo;

import com.baomidou.mybatisplus.core.metadata.IPage;
import lombok.Data;


@Data
public class forumVo {
    private IPage<Article> learnArticle;
    private IPage<Article> chatArticle;

    public forumVo(IPage<Article> learnArticle, IPage<Article> chatArticle) {
        this.learnArticle = learnArticle;
        this.chatArticle = chatArticle;
    }
}
