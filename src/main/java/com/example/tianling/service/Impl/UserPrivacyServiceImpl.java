package com.example.tianling.service.Impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.tianling.dao.UserPrivacyMapper;
import com.example.tianling.entity.UserPrivacyEntity;
import com.example.tianling.service.UserPrivacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPrivacyServiceImpl
        extends ServiceImpl<UserPrivacyMapper, UserPrivacyEntity>
        implements UserPrivacyService {
    @Autowired
    private UserPrivacyMapper userPrivacyMapper;
    @Override
    public Integer updata(UserPrivacyEntity userPrivacyEntity, Integer userId){
        userPrivacyEntity.setUserId(userId);
        UserPrivacyEntity existingRecord = userPrivacyMapper.selectById(userPrivacyEntity.getUserId());

        if (existingRecord != null) {
            // 如果存在记录，执行更新操作
            Integer result = userPrivacyMapper.updateById(userPrivacyEntity);
            return result;
        } else {
            // 如果不存在记录，执行插入操作
            Integer result = userPrivacyMapper.insert(userPrivacyEntity);
            return result;
        }
    }

    @Override
    public UserPrivacyEntity getMySetting(Integer userId) {
        return userPrivacyMapper.selectById(userId);
    }
}
