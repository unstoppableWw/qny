package com.example.tianling.dao;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.tianling.entity.CommentEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommentMapper extends BaseMapper<CommentEntity> {
}
