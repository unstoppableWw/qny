package com.example.tianling.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.tianling.entity.FeedbackEntity;
import com.example.tianling.entity.FollowEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FeedbackMapper extends BaseMapper<FeedbackEntity> {
}
