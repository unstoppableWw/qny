package com.example.tianling.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.tianling.common.params.PublishLearnArticleDo;
import com.example.tianling.common.vo.Article;

import java.io.IOException;

public interface ForumService {
    IPage<Article> load(int pageNum, int typeNum);
     void publish_learn(PublishLearnArticleDo publishLearnArticleDo,String userId) throws IOException;
     void publish_train_content(PublishLearnArticleDo publishLearnArticleDo,String userId,String roomId)  ;
    //搜索
    IPage<Article> search(Integer page, Integer type, String keyword);
    public boolean is_follow_like_save(String user_id,String other_id,String action);
}
