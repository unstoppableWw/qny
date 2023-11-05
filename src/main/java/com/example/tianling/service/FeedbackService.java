package com.example.tianling.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.tianling.entity.FeedbackEntity;
import com.example.tianling.entity.UserEntity;

import java.util.List;

/**
 * @className: FeedbackService
 * @author: Kyle
 * @date: 2023/8/7 16:39
 **/
public interface FeedbackService extends IService<FeedbackEntity> {
    Integer toProcessed(FeedbackEntity feedbackEntity);
    Integer toDelete(List ls);
    List<FeedbackEntity> feedbackList(Integer type);
    List<FeedbackEntity> isProcessedList(Integer isProcessed);
    List<FeedbackEntity> infoList(FeedbackEntity feedbackEntity);
    List<FeedbackEntity> getInfoByUserId(UserEntity user);
}
