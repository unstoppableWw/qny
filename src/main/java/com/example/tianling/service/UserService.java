package com.example.tianling.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.tianling.common.params.*;
import com.example.tianling.entity.UserEntity;

public interface UserService extends IService<UserEntity> {
    boolean sendSMS (String mobile, String code) throws Exception;
    void register(RegisterDo registerDo);
    Integer passwordLogin(String mobile, String password);
    Integer smscodeLogin(String mobile, String code);
    void updateUserByUserId(UpdateUserDo updateUserDo, Integer userId);
    UserEntity getUserByUserId(Integer userId);


    void updateFollowNum(Integer userId, Boolean isIncrease);
    void updateFansNum(Integer userId, Boolean isIncrease);

}
