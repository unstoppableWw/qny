package com.example.tianling.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.tianling.common.vo.fansVo;
import com.example.tianling.common.vo.followVo;
import com.example.tianling.entity.FollowEntity;

import java.util.List;

public interface FollowService extends IService<FollowEntity> {
    List<followVo> getFollowList(Integer userId);
    List<fansVo> getFansList(Integer userId);
    FollowEntity checkFollow(Integer userId, Integer followUserId);
    void followUser(Integer userId, Integer followUserId);
    void cancelFollowUser(Integer userId, Integer followUserId);
}
