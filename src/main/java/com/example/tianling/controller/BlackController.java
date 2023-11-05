package com.example.tianling.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.tianling.common.annotation.Login;
import com.example.tianling.common.annotation.LoginUser;
import com.example.tianling.common.utils.R;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.service.BlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@Controller
public class BlackController {
    @Autowired
    private BlacklistService blacklistService ;//使用RabbiTeme,提供了接受发送方法


    //黑名单
    @Login
    @PostMapping(value="/Blacklist/getBlack.do")
    @ResponseBody
    public R getBlacklist(@LoginUser UserEntity user) {
        return R.success(blacklistService.getBlackList(user.getUserId()));
    }

    //
    @Login
    @PostMapping(value="/Blacklist/insertBlack.do")
    @ResponseBody
    public R insertBlack(@RequestBody String params,@LoginUser UserEntity user) throws ParseException {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String secondaryUserId = paramsJSONObject.getString("secondaryUserId");
        Integer result = blacklistService.insertBalcklist(user.getUserId(), Integer.valueOf(secondaryUserId));
        if(result==1){
            return R.success("拉黑成功");
        }
        else {
            return R.error(404,"拉黑失败");
        }
    }

    @Login
    @PostMapping(value="/Blacklist/delelteBlack.do")
    @ResponseBody
    public R delelteBlack(@RequestBody String params,@LoginUser UserEntity user) throws ParseException {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String secondaryUserId = paramsJSONObject.getString("secondaryUserId");
        Integer result = blacklistService.deleteBalcklist(user.getUserId(), Integer.valueOf(secondaryUserId));
        if(result==1){
            return R.success("移除黑名单成功");
        }
        else {
            return R.error(404,"移除黑名单失败");
        }
    }

    @Login
    @PostMapping(value="/Blacklist/checkBlack.do")
    @ResponseBody
    public R checkBlack(@RequestBody String params,@LoginUser UserEntity user) throws ParseException {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String secondaryUserId = paramsJSONObject.getString("secondaryUserId");
        Integer result = blacklistService.chackBalcklist(user.getUserId(), Integer.valueOf(secondaryUserId));
        return R.success(result);
    }
}
