package com.example.tianling.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.tianling.entity.CommentEntity;
import com.example.tianling.entity.UserEntity;

import java.util.List;

/**
 * @className: CommentService
 * @author: Kyle
 * @date: 2023/8/3 13:09
 **/
public interface CommentService extends IService<CommentEntity> {
    List<CommentEntity> findComment(UserEntity user);
    Integer deleteComment(String commnetId);
    CommentEntity getCommentById(Integer commentId);
}
