package com.example.tianling.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.tianling.dao.FeedbackMapper;
import com.example.tianling.dao.UserMapper;
import com.example.tianling.entity.*;
import com.example.tianling.service.FeedbackService;
import com.example.tianling.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @className: FeedbackServiceImpl
 * @author: Kyle
 * @date: 2023/8/7 16:40
 **/
@Service
public class FeedbackServiceImpl extends ServiceImpl<FeedbackMapper, FeedbackEntity>
        implements FeedbackService {
    @Autowired
    private FeedbackMapper feedbackMapper;
    @Override
    public  Integer toProcessed(FeedbackEntity feedbackEntity){
        UpdateWrapper<FeedbackEntity> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("feedback_id",feedbackEntity.getFeedbackId());
        updateWrapper.set("is_processed",1);

        return feedbackMapper.update(null,updateWrapper);
    }
    @Override
    public Integer toDelete(List ls){
        System.out.println(ls);
        QueryWrapper<FeedbackEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.in("feedback_id",ls);
        Integer result = feedbackMapper.delete(queryWrapper);
        return result;

    }
    @Override
    public List<FeedbackEntity> feedbackList(Integer type) {
        System.out.println(type);
        List<FeedbackEntity> list = this.lambdaQuery()
                .eq(FeedbackEntity::getType, type)
                .orderByDesc(FeedbackEntity::getCreateTime)
                .list();
        return list;
    }

    @Override
    public List<FeedbackEntity> isProcessedList(Integer isProcessed) {
        List<FeedbackEntity> list = this.lambdaQuery()
                .eq(FeedbackEntity::getIsProcessed, isProcessed)
                .list();
        return list;
    }

    @Override
    public List<FeedbackEntity> infoList(FeedbackEntity feedbackEntity) {
        List<FeedbackEntity> list = this.lambdaQuery()
                .eq(FeedbackEntity::getIsProcessed, feedbackEntity.getIsProcessed())
                .eq(FeedbackEntity::getType,feedbackEntity.getType())
                .list();
        return list;
    }

    @Override
    public List<FeedbackEntity> getInfoByUserId(UserEntity user) {
        List<FeedbackEntity> list = this.lambdaQuery()
                .eq(FeedbackEntity::getUserId, user.getUserId())
                .list();
        return list;
    }

}
