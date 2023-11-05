package com.example.tianling.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.tianling.entity.ChatMessageEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ChatMessageMapper extends BaseMapper<ChatMessageEntity> {
}
