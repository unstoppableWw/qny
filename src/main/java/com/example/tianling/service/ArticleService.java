package com.example.tianling.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.tianling.common.params.InsertCommentDo;
import com.example.tianling.common.vo.ArticleVo;
import com.example.tianling.common.vo.articleCommonVo;
import com.example.tianling.entity.ArticleEntity;
import com.example.tianling.entity.CommentEntity;
import com.example.tianling.entity.UserEntity;

import java.util.List;

public interface ArticleService {
     ArticleVo article_conment(String articleId,String userId,int pageNum);
     Page<CommentEntity> get_conment(String articleId, int pageNum);
     void insert_comment(InsertCommentDo insertCommentDo, String userId, String userName, String userImg);
     void follow(String userId, String followId);
     void cancle_follow(String followId,String userId);
     void like(String userId,String articleId);

     void unlike(String userId,String articleId);
     void save(String userId,String articleId);
     void cancle_save(String userId,String articleId);
     UserEntity getHisImg(String userId);

     IPage<articleCommonVo> getMyArticle(Integer userId, Integer page);
     List<ArticleEntity> getMyArticle(Integer id);
     IPage<articleCommonVo> getSaveArticle(Integer userId, Integer page);

}
