package com.example.tianling.dao;
import com.example.tianling.entity.BlacklistEntity;
import com.example.tianling.entity.FollowEntity;
import com.github.yulichang.base.MPJBaseMapper;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BlacklistMapper extends MPJBaseMapper<BlacklistEntity> {
}
