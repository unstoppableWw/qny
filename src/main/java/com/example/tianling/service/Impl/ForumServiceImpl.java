package com.example.tianling.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.tianling.common.params.PublishLearnArticleDo;
import com.example.tianling.common.vo.Article;
import com.example.tianling.dao.*;
import com.example.tianling.entity.*;
import com.example.tianling.service.ForumService;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ForumServiceImpl
        extends ServiceImpl<ArticleMapper, ArticleEntity>
        implements ForumService {
    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private LikeMapper likeMapper;
    @Autowired
    private SaveMapper saveMapper;
    @Autowired
    private UserMapper userMapper;

//加载刷新论坛页面
    public boolean is_follow_like_save(String user_id,String other_id,String action){
        Long code;
        if (action == "like"){
            QueryWrapper<LikeEntity> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("article_id",other_id).eq("user_id",user_id);
            code = likeMapper.selectCount(queryWrapper);
        }
        else {
            QueryWrapper<SaveEntity> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("article_id",other_id).eq("user_id",user_id);
            code = saveMapper.selectCount(queryWrapper);
        }
        return code != 0;
    }
    public IPage<Article> load(int pageNum, int typeNum){
        Page<Article> pg = new Page<>(pageNum, 10);
        IPage<Article> articleIPage = articleMapper.selectJoinPage(pg, Article.class,
                new MPJLambdaWrapper<ArticleEntity>()
                        .selectAll(ArticleEntity.class)
                        .select(UserEntity::getUserName)
                        .select(UserEntity::getUserImg)
                        .select(ArticleEntity::getArticleImg)
                        .eq(ArticleEntity::getType,typeNum)
                        .leftJoin(UserEntity.class,UserEntity::getUserId,ArticleEntity::getUserId)
                        .orderByDesc(ArticleEntity::getCreateTime));
        return articleIPage;
    }

    //发贴，内容插入帖子数据表
    public void publish_learn(PublishLearnArticleDo publishLearnArticleDo,String userId) throws IOException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss ");
        String date = formatter.format(new Date(System.currentTimeMillis()));
        UpdateWrapper<UserEntity> wrapper = new UpdateWrapper();
        wrapper.eq("user_id",userId);
        wrapper.setSql("article_num = article_num + 1");
        userMapper.update(null,wrapper);
        ArticleEntity articleEntity =new ArticleEntity();
        articleEntity.setUserId(userId);
        articleEntity.setContent(publishLearnArticleDo.getContext());
        articleEntity.setTitle(publishLearnArticleDo.getTitle());
        articleEntity.setType(publishLearnArticleDo.getArctleType());
        articleEntity.setCreateTime(date);
//        articleEntity.setArticleImg(publishLearnArticleDo.getArticleImg().toString());
        articleEntity.setLikeNum("0");
        articleEntity.setSaveNum("0");
        articleEntity.setViewNum("0");

        articleEntity.setArticleImg(publishLearnArticleDo.getArticleImg());

        articleMapper.insert(articleEntity);
    }

    public void publish_train_content(PublishLearnArticleDo publishLearnArticleDo,String userId,String roomId)  {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss ");
        String date = formatter.format(new Date(System.currentTimeMillis()));
        UpdateWrapper<UserEntity> wrapper = new UpdateWrapper();
        wrapper.eq("user_id",userId);
        wrapper.setSql("article_num = article_num + 1");
        userMapper.update(null,wrapper);
        ArticleEntity articleEntity =new ArticleEntity();
        articleEntity.setUserId(userId);
        articleEntity.setContent(publishLearnArticleDo.getContext());
        articleEntity.setTitle(publishLearnArticleDo.getTitle());
        articleEntity.setType(publishLearnArticleDo.getArctleType());
        articleEntity.setCreateTime(date);
        articleEntity.setLikeNum("0");
        articleEntity.setSaveNum("0");
        articleEntity.setViewNum("0");
        articleMapper.insert(articleEntity);
    }

    public IPage<Article> search(Integer pageNum, Integer typeNum, String keyword){
        //寻找文章表标题里面是否存在关键词
        Page<Article> pg = new Page<>(pageNum, 10);
        IPage<Article> articleIPage = articleMapper.selectJoinPage(pg, Article.class,
                new MPJLambdaWrapper<ArticleEntity>()
                        .selectAll(ArticleEntity.class)
                        .select(UserEntity::getUserName)
                        .select(UserEntity::getUserImg)
                        .eq(ArticleEntity::getType,typeNum)
                        .like(ArticleEntity::getTitle,keyword)
                        .leftJoin(UserEntity.class,UserEntity::getUserId,ArticleEntity::getUserId)
                        .leftJoin(LikeEntity.class,LikeEntity::getArticle_id,ArticleEntity::getArticleId)
                        .orderByDesc(ArticleEntity::getCreateTime));
        return articleIPage;
    }

}
