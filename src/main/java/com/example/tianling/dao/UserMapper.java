package com.example.tianling.dao;

import com.example.tianling.entity.UserEntity;
import com.github.yulichang.base.MPJBaseMapper;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends MPJBaseMapper<UserEntity> {
}