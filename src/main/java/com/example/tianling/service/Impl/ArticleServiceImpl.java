package com.example.tianling.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.tianling.common.params.InsertCommentDo;
import com.example.tianling.common.vo.*;
import com.example.tianling.dao.*;
import com.example.tianling.entity.*;
import com.example.tianling.service.ArticleService;
import com.example.tianling.service.MessageService;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ArticleServiceImpl
        extends ServiceImpl<ArticleMapper, ArticleEntity>
        implements ArticleService {
    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private FollowMapper followMapper;
    @Autowired
    private LikeMapper likeMapper;
    @Autowired
    private SaveMapper saveMapper;
    @Autowired
    private RabbitTemplate rabbitTemplate;

    //加载文章
    public ArticleVo article_conment(String articleId,String userId,int pageNum){
        //文章中的浏览数加一
        UpdateWrapper<ArticleEntity> wrapper = new UpdateWrapper();
        wrapper.eq("article_id",articleId);
        wrapper.setSql("view_num = view_num + 1");
        articleMapper.update(null,wrapper);

        ArticleEntity article = articleMapper.selectById(articleId);
        Page<CommentEntity> commentPage = get_conment(articleId,pageNum);
        Boolean follow = is_follow_like_save(userId,article.getUserId(),"follow");
        Boolean like = is_follow_like_save(userId,articleId,"like");
        Boolean save = is_follow_like_save(userId,articleId,"save");
        return new ArticleVo(article,commentPage,follow,like,save);
    }
    //获取评论
    public Page<CommentEntity> get_conment(String articleId, int pageNum){
        QueryWrapper<CommentEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("info_id",articleId);
        queryWrapper.orderByDesc("create_time");
        Page<CommentEntity> page = new Page<>(pageNum, 10);
        return commentMapper.selectPage(page,queryWrapper);
    }
    //获取是否关注or点赞or收藏
    public boolean is_follow_like_save(String user_id,String other_id,String action){
        Long code = null;
        if(action == "follow"){
            QueryWrapper<FollowEntity> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("follow_user_id",other_id).eq("user_id",user_id);
            code = followMapper.selectCount(queryWrapper);
        }
        else if (action == "like"){
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
    //新增评论
    public  void insert_comment(InsertCommentDo insertCommentDo,String user_id,String user_name,String user_img) {
        QueryWrapper<UserEntity> queryWrapper = new QueryWrapper<>();
        CommentEntity commentEntity = new CommentEntity();
        String reply_user_name = null;
        if (insertCommentDo.getReply_user_id().equals("")) {
            String reply_name = "";
            String reply_img = "";
        } else {
            queryWrapper.clear();
            queryWrapper.select("user_name", "user_img");
            queryWrapper.eq("user_id", insertCommentDo.getReply_user_id());
            List<Map<String, Object>> reply_user_info = userMapper.selectMaps(queryWrapper);
            reply_user_name = reply_user_info.get(0).get("user_name").toString();
            String reply_user_img = reply_user_info.get(0).get("user_img").toString();
            commentEntity.setReplyName(reply_user_name);
            commentEntity.setReplyUserId(insertCommentDo.getReply_user_id());
        }
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss ");
        Date date = new Date(System.currentTimeMillis());

        commentEntity.setContent(insertCommentDo.getContent());
        commentEntity.setUserId(user_id);
        commentEntity.setContent(insertCommentDo.getContent());
        commentEntity.setCreateTime(date);
        commentEntity.setInfold(insertCommentDo.getInfo_id());
        commentEntity.setUserName(user_name);
        commentEntity.setUserImg(user_img);
        commentEntity.setCreateTime(date);
        commentMapper.insert(commentEntity);
        ArticleEntity articleEntity = articleMapper.selectById(commentEntity.getInfoId());
//        messageService.insertCommentMessage(Integer.parseInt(articleEntity.getUserId()),Integer.parseInt(user_id),articleEntity.getArticleId(),commentEntity.getCommentId());

        try {
            Map<String, Object> map = new HashMap<>();
            map.put("userId", articleEntity.getUserId());
            map.put("commentUserId", user_id);
            map.put("content", commentEntity.getContent());
            map.put("articleId", articleEntity.getArticleId());
            rabbitTemplate.convertAndSend("topicExchangeNotice", "topic.notice_comment", map);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    //取消关注
    public void cancle_follow(String userId,String followId){
        QueryWrapper<FollowEntity> queryWrapper = new QueryWrapper<>();
        UpdateWrapper<UserEntity> wrapper = new UpdateWrapper();
        wrapper.eq("user_id",userId);
        wrapper.setSql("follow_num = follow_num - 1");
        userMapper.update(null,wrapper);
        try {
            queryWrapper.eq("follow_user_id",followId).eq("user_id",userId);
            followMapper.delete(queryWrapper);
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    //关注
    public void follow(String userId, String followId){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss ");
        String date = formatter.format(new Date(System.currentTimeMillis()));
        UpdateWrapper<UserEntity> wrapper = new UpdateWrapper();
        wrapper.eq("user_id",userId);
        wrapper.setSql("follow_num = follow_num + 1");
        userMapper.update(null,wrapper);

        try {
            FollowEntity followEntity = new FollowEntity();
            followEntity.setUserId(Integer.parseInt(userId));
            followEntity.setFollowUserId(Integer.parseInt(followId));
            followEntity.setTime(new Date());
            followMapper.insert(followEntity);
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    //点赞
    public  void like(String userId,String articleId){
        //文章中的点赞数加一
        UpdateWrapper<ArticleEntity> wrapper = new UpdateWrapper();
        wrapper.eq("article_id",articleId);
        wrapper.setSql("like_num = like_num + 1");
        articleMapper.update(null,wrapper);
        //点赞表加一行
        LikeEntity likeEntity = new LikeEntity();
        likeEntity.setUserId(userId);
        likeEntity.setArticle_id(articleId);
        Integer succ;
        try {
            succ = likeMapper.insert(likeEntity);
            ArticleEntity articleEntity = articleMapper.selectById(articleId);
            Map<String, Object> map = new HashMap<>();
            map.put("userId", articleEntity.getUserId());
            map.put("likeUserId", userId);
            map.put("articleId", articleEntity.getArticleId());
            rabbitTemplate.convertAndSend("topicExchangeNotice", "topic.notice_like", map);
        } catch (Exception e){
            succ = -1;
        }

    }
    //取消关注
    public void unlike(String userId,String articleId){
        //文章中的点赞数减一
        UpdateWrapper<ArticleEntity> wrapper = new UpdateWrapper();
        wrapper.eq("article_id",articleId);
        wrapper.setSql("like_num = like_num - 1");
        articleMapper.update(null,wrapper);
        //点赞表删除一行信息
        QueryWrapper<LikeEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",userId).eq("article_id",articleId);
        int code = likeMapper.delete(queryWrapper);
    }

    //收藏
    public void save(String userId,String articleId){
        //文章中的收藏数加一
        UpdateWrapper<ArticleEntity> wrapper = new UpdateWrapper();
        wrapper.eq("article_id",articleId);
        wrapper.setSql("save_num = save_num + 1");
        articleMapper.update(null,wrapper);
        //收藏表加一行
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss ");
        String date = formatter.format(new Date(System.currentTimeMillis()));
        SaveEntity saveEntity = new SaveEntity();
        saveEntity.setUserId(userId);
        saveEntity.setArticleId(articleId);
        saveEntity.setSaveTime(date);
        try {
            saveMapper.insert(saveEntity);
        }
        catch (Exception e){
        }
    }

    //取消收藏
    public void cancle_save(String userId,String articleId){
        //文章中的收藏数减一
        UpdateWrapper<ArticleEntity> wrapper = new UpdateWrapper();
        wrapper.eq("article_id",articleId);
        wrapper.setSql("save_num = save_num - 1");
        articleMapper.update(null,wrapper);
        //点赞表删除一行信息
        QueryWrapper<SaveEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",userId).eq("article_id",articleId);
        int code = saveMapper.delete(queryWrapper);
    }

    public UserEntity getHisImg(String hisArticleId){

        return userMapper.selectById(articleMapper.selectById(hisArticleId).getUserId());
    }
    /*
     * 根据userId获取我的帖子
     */
    @Override
    public IPage<articleCommonVo> getMyArticle(Integer userId, Integer page) {
        // 分页器
        Page<articleCommonVo> pg = new Page<>(page, 10);

        IPage<articleCommonVo> articleIPage = articleMapper.selectJoinPage(pg, articleCommonVo.class,
                new MPJLambdaWrapper<articleCommonVo>()
                        .select(UserEntity::getUserId, UserEntity::getUserName, UserEntity::getUserImg)
                        .select(ArticleEntity::getArticleId, ArticleEntity::getTitle, ArticleEntity::getContent, ArticleEntity::getCreateTime)
                        .select(ArticleEntity::getLikeNum, ArticleEntity::getSaveNum, ArticleEntity::getViewNum,ArticleEntity::getArticleImg)
                        .eq(UserEntity::getUserId, userId)
                        .leftJoin(UserEntity.class,UserEntity::getUserId,ArticleEntity::getUserId)
                        .orderByDesc(ArticleEntity::getCreateTime));

        for (articleCommonVo articleCommonVo : articleIPage.getRecords()) {
            Boolean like = is_follow_like_save(userId.toString(),articleCommonVo.getArticleId().toString(),"like");
            Boolean save = is_follow_like_save(userId.toString(),articleCommonVo.getArticleId().toString(),"save");
            Integer like_now = like ? 1 : 0;
            Integer save_now = save ? 1 : 0;
            articleCommonVo.setLike(like_now);
            articleCommonVo.setSave(save_now);
        }
        return articleIPage;
    }
    /*
     * 根据userId获取收藏的帖子
     */
    @Override
    public IPage<articleCommonVo> getSaveArticle(Integer userId, Integer page) {
        // 分页器
        Page<articleCommonVo> pg = new Page<>(page, 10);
        IPage<articleCommonVo> articleIPage = saveMapper.selectJoinPage(pg, articleCommonVo.class,
                new MPJLambdaWrapper<articleCommonVo>()
                        .select(UserEntity::getUserId, UserEntity::getUserName, UserEntity::getUserImg)
                        .select(ArticleEntity::getArticleId, ArticleEntity::getTitle, ArticleEntity::getContent, ArticleEntity::getCreateTime)
                        .select(ArticleEntity::getLikeNum, ArticleEntity::getSaveNum, ArticleEntity::getViewNum,ArticleEntity::getArticleImg)
                        .eq(SaveEntity::getUserId, userId)
                        .leftJoin(ArticleEntity.class,ArticleEntity::getArticleId,SaveEntity::getArticleId)
                        .leftJoin(UserEntity.class,UserEntity::getUserId,ArticleEntity::getUserId)
                        .orderByDesc(SaveEntity::getSaveTime));
        for (articleCommonVo articleCommonVo : articleIPage.getRecords()) {
            Boolean like = is_follow_like_save(userId.toString(),articleCommonVo.getArticleId().toString(),"like");
            Boolean save = is_follow_like_save(userId.toString(),articleCommonVo.getArticleId().toString(),"save");
            Integer like_now = like ? 1 : 0;
            Integer save_now = save ? 1 : 0;
            articleCommonVo.setLike(like_now);
            articleCommonVo.setSave(save_now);
        }
        return articleIPage;
    }

    @Override
    public List<ArticleEntity> getMyArticle(Integer id) {
        //获取文章信息
        LambdaQueryWrapper<ArticleEntity> articleEntityLambdaQueryWrapper = new LambdaQueryWrapper<>();
        articleEntityLambdaQueryWrapper.eq(ArticleEntity::getUserId,id);
        List<ArticleEntity> articleEntityList = articleMapper.selectList(articleEntityLambdaQueryWrapper);
        return articleEntityList;
    }
}
