package com.example.tianling.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.tianling.common.annotation.Login;
import com.example.tianling.common.annotation.LoginUser;
import com.example.tianling.common.utils.R;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.entity.UserPrivacyEntity;
import com.example.tianling.service.BlacklistService;
import com.example.tianling.service.FollowService;
import com.example.tianling.service.UserPrivacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserPrivacyController {
    @Autowired
    private UserPrivacyService userPrivacyService ;//使用RabbiTeme,提供了接受发送方法
    @Autowired
    private BlacklistService blacklistService;
    @Autowired
    private FollowService followService;
    //加载帖子页，需要加载这个帖子，和分页加载评论
    @Login
    @PostMapping(value="/UserPrivacy/updataSetting.do")
    @ResponseBody
    public R getIdeas(@RequestBody UserPrivacyEntity userPrivacyEntity, @LoginUser UserEntity user) {
       return R.success(userPrivacyService.updata(userPrivacyEntity,user.getUserId()));
    }

    @Login
    @PostMapping(value="/UserPrivacy/getMySetting.do")
    @ResponseBody
    public R getMySetting(@LoginUser UserEntity user) {
        return R.success(userPrivacyService.getMySetting(user.getUserId()));
    }

    @Login
    @PostMapping(value="/UserPrivacy/isCanChat.do")
    @ResponseBody
    public R isCanChat(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer userId = paramsJSONObject.getInteger("userId");
        Integer isInBlack = blacklistService.chackBalcklist(userId,user.getUserId());
        if(isInBlack==1){
            return R.success(0);
        }

        UserPrivacyEntity isAdmin = userPrivacyService.getMySetting(userId);
        if(isAdmin.getAllowPrivateMessages()!=1){
            if(followService.checkFollow(userId,user.getUserId())==null){
                return R.success(0);
            }
            else {
                return R.success(1);
            }
        }
        return R.success(1);
    }
}
