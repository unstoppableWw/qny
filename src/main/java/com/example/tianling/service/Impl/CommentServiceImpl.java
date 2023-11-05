package com.example.tianling.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.tianling.dao.CommentMapper;
import com.example.tianling.entity.CommentEntity;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl
        extends ServiceImpl<CommentMapper, CommentEntity>
        implements CommentService {
    @Autowired
    CommentMapper commentMapper;
    @Override
    public List<CommentEntity> findComment(UserEntity user) {
        System.out.println(user.getUserId());
        List<CommentEntity> list = this.lambdaQuery()
                .eq(CommentEntity::getUserId, user.getUserId())
                .list();
        System.out.println(list);
        return list;
    }

    public  Integer deleteComment(String commnetId){
        return  commentMapper.deleteById(commnetId);
    }

    @Override
    public CommentEntity getCommentById(Integer commentId) {
        CommentEntity comment = this.lambdaQuery()
                .eq(CommentEntity::getCommentId, commentId)
                .one();
        return comment;
    }
}
