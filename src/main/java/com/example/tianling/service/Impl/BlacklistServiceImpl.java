package com.example.tianling.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.tianling.common.vo.BlackVo;
import com.example.tianling.dao.BlacklistMapper;
import com.example.tianling.entity.*;
import com.example.tianling.service.BlacklistService;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BlacklistServiceImpl
        extends ServiceImpl<BlacklistMapper, BlacklistEntity>
        implements BlacklistService {
    @Autowired
    private BlacklistMapper blacklistMapper;
    @Override
    public List<BlackVo> getBlackList(Integer userId) {

        List<BlackVo> blackVos = blacklistMapper.selectJoinList(BlackVo.class,
                new MPJLambdaWrapper<BlackVo>()
                        .select(UserEntity::getUserName, UserEntity::getUserImg, UserEntity::getUserId,UserEntity::getDescription)
                        .eq(BlacklistEntity::getPrimaryUserId, userId)
                        .leftJoin(UserEntity.class,UserEntity::getUserId,BlacklistEntity::getSecondaryUserId)
                        .orderByDesc(BlacklistEntity::getTime));
        return blackVos;
    }

    @Override
    public Integer insertBalcklist(Integer userId, Integer secondaryUserId) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String currentDateTimeString = formatter.format(new Date(System.currentTimeMillis()));
        BlacklistEntity blacklistEntity = new BlacklistEntity(userId,secondaryUserId, formatter.parse(currentDateTimeString));
        Integer result = 0;
        try {
            result = blacklistMapper.insert(blacklistEntity);
        }catch (Exception e){
        }
        return result;
    }

    @Override
    public Integer deleteBalcklist(Integer userId, Integer secondaryUserId) {
        QueryWrapper<BlacklistEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("primary_user_id",userId);
        queryWrapper.eq("secondary_user_id",secondaryUserId);
        Integer result = 0;
        try {
            result = blacklistMapper.delete(queryWrapper);
        }catch (Exception e){
        }
        return result;
    }

    @Override
    public Integer chackBalcklist(Integer userId, Integer secondaryUserId) {
        QueryWrapper<BlacklistEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("primary_user_id",userId);
        queryWrapper.eq("secondary_user_id",secondaryUserId);
        Integer result = 0;
        if(blacklistMapper.selectCount(queryWrapper)>0){
            result = 1;
        }
        return result;
    }
}
