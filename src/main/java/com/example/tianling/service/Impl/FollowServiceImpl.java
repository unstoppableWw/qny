package com.example.tianling.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.tianling.common.vo.fansVo;
import com.example.tianling.common.vo.followVo;
import com.example.tianling.dao.FollowMapper;
import com.example.tianling.entity.FollowEntity;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.service.FollowService;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FollowServiceImpl
        extends ServiceImpl<FollowMapper, FollowEntity>
        implements FollowService {

    @Autowired
    private FollowMapper followMapper;

    @Override
    public List<followVo> getFollowList(Integer userId) {
        MPJLambdaWrapper wrapper = new MPJLambdaWrapper<followVo>()
                .selectAs(FollowEntity::getFollowUserId, "userId")
                .select(UserEntity::getUserName, UserEntity::getUserImg, UserEntity::getDescription)
                .eq(FollowEntity::getUserId, userId)
                .leftJoin(UserEntity.class, UserEntity::getUserId, FollowEntity::getFollowUserId);
        List<followVo> followList = followMapper.selectJoinList(followVo.class, wrapper);
        return followList;
    }

    @Override
    public List<fansVo> getFansList(Integer userId) {
        MPJLambdaWrapper wrapper = new MPJLambdaWrapper<followVo>()
                .select(FollowEntity::getUserId)
                .select(UserEntity::getUserName, UserEntity::getUserImg, UserEntity::getDescription)
                .eq(FollowEntity::getFollowUserId, userId)
                .leftJoin(UserEntity.class, UserEntity::getUserId, FollowEntity::getUserId);
        List<fansVo> fansList = followMapper.selectJoinList(fansVo.class, wrapper);
        return fansList;
    }

    @Override
    public FollowEntity checkFollow(Integer userId, Integer followUserId) {
        FollowEntity follow = this.lambdaQuery()
                .eq(FollowEntity::getUserId, userId)
                .eq(FollowEntity::getFollowUserId, followUserId)
                .one();
        return follow;
    }

    @Override
    public void followUser(Integer userId, Integer followUserId) {
        FollowEntity follow = new FollowEntity();
        follow.setUserId(userId);
        follow.setFollowUserId(followUserId);
        follow.setTime(new Date());
        followMapper.insert(follow);
    }

    @Override
    public void cancelFollowUser(Integer userId, Integer followUserId) {
        QueryWrapper<FollowEntity> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId).eq("follow_user_id",followUserId);
        followMapper.delete(wrapper);
    }
}
