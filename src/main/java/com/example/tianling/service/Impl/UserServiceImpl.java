package com.example.tianling.service.Impl;

import com.aliyun.dysmsapi20170525.Client;
import com.aliyun.dysmsapi20170525.models.SendSmsRequest;
import com.aliyun.dysmsapi20170525.models.SendSmsResponse;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.tianling.common.exception.TianLingException;
import com.example.tianling.common.params.*;
import com.example.tianling.common.utils.MinioUtils;
import com.example.tianling.common.utils.RedisUtils;
import com.example.tianling.config.ALiYunSMSConfig;
import com.example.tianling.dao.UserMapper;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.service.UserService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.util.*;

import static com.example.tianling.common.utils.ImageUtils.compress;
import static com.example.tianling.common.utils.toImg.convert;
import static com.example.tianling.common.utils.toImg.getImageFormat;

@Service
public class UserServiceImpl
        extends ServiceImpl<UserMapper, UserEntity>
        implements UserService {

    @Autowired
    private ALiYunSMSConfig aLiYunSMSConfig;

    @Autowired
    private RedisUtils redisUtils;

    @Autowired
    private MinioUtils minioUtils;

    /*
     * 发送验证码 service层
     * 1.配置阿里云信息发送 client和sendSmsRequest
     * 2.将验证码code转为Json并放入sendSmsRequest
     * 3.设置sendSmsResponse响应接收验证码发送状态
     * 4.判断成功为(code="OK"),返回true
     */
    @Override
    public boolean sendSMS(String mobile, String code) throws Exception{
        // 1.配置阿里云信息发送 client和sendSmsRequest
        Client client = aLiYunSMSConfig.createClient();
        SendSmsRequest sendSmsRequest = new SendSmsRequest();
        sendSmsRequest.setSignName("天领验证码");
        sendSmsRequest.setTemplateCode("SMS_461866050");
        sendSmsRequest.setPhoneNumbers(mobile);

        // 2.将验证码code转为Json并放入sendSmsRequest
        Map<String,Object> param = new HashMap();
        param.put("code", code);
        String templateParam = JSONObject.toJSONString(param);
        sendSmsRequest.setTemplateParam(templateParam);

        // 3.设置sendSmsResponse响应接收验证码发送状态
        SendSmsResponse sendSmsResponse;
        try {
            sendSmsResponse = client.sendSms(sendSmsRequest);
//            System.out.println(sendSmsResponse.getBody().getMessage());
        }catch (Exception e){
            throw new Exception("调用阿里云发送短信接口失败",e);
        }

        //4.判断成功为(code="OK"),返回tru
        if (sendSmsResponse.getBody().getCode().equals("OK")) {
            return true;
        }
        return false;
    }

    /*
     * 用户注册 service层
     * 1.查询该mobile是否已被注册，被注册则抛出异常(code=409, msg="手机号码已被注册")
     * 2.查询验证码是否和redis中的相同，错误则抛出(code=401, msg="验证码错误")
     * 3.注册用户,向user表并写入该用户信息
     */
    @Override
    public void register(RegisterDo registerDo) {
        UserEntity userEntity = this.lambdaQuery()
                .eq(UserEntity::getMobile, registerDo.getMobile())
                .one();
        String smsCode = redisUtils.get(registerDo.getMobile());

        // 1.查询该mobile是否已被注册，被注册则抛出异常(code=409, msg="手机号码已被注册")
        if (userEntity != null) {
            throw new TianLingException(409, "手机号码已被注册");
        } else if (!registerDo.getCode().equals(smsCode)) {
        // 2.查询验证码是否和redis中的相同，错误则抛出(code=401, msg="验证码错误")
            throw new TianLingException(401, "验证码错误");
        } else {
            // 3.注册用户,向user表并写入该用户信息
            UserEntity user = new UserEntity();
            user.setPassword(registerDo.getPassword());
            user.setMobile(registerDo.getMobile());
            user.setArticleNum(0);
            user.setFollowNum(0);
            user.setFansNum(0);
            int result = baseMapper.insert(user);
            if (result != 1) {
                throw new TianLingException(405, "注册失败");
            }
        }

    }

    /*
     * 密码登录 service层
     * 1.根据mobile去查询user，未注册则抛出(code=404, msg="该手机号未注册")
     * 2.密码错误则抛出(code=401, msg="密码错误")
     * 3.检验成功则返回userId
     */
    @Override
    public Integer passwordLogin(String mobile, String password) {
        // 1.根据mobile去查询user，未注册则抛出(code=404, msg="该手机号未注册")
        UserEntity user = this.lambdaQuery()
                .select(UserEntity::getUserId, UserEntity::getPassword)
                .eq(UserEntity::getMobile, mobile)
                .one();
        if (user == null) {
            throw new TianLingException(404, "该手机号未注册");
        } else if (!password.equals(user.getPassword())) {
            // 2.密码错误则抛出(code=401, msg="密码错误")
            throw new TianLingException(401, "密码错误");
        }

        // 3.检验成功则返回userId
        return user.getUserId();
    }


    /*
     * 验证码登录 service层
     * 1.根据mobile去查询user，未注册则抛出(code=404, msg="该手机号未注册")
     * 2.验证码错误则抛出(code=401, msg="验证码错误")
     * 3.检验成功则返回userId
     */
    @Override
    public Integer smscodeLogin(String mobile, String code) {
        UserEntity userEntity = this.lambdaQuery()
                .eq(UserEntity::getMobile, mobile)
                .one();
        // 1.根据mobile去查询user，未注册则抛出(code=404, msg="该手机号未注册")
        if (userEntity == null) {
            throw new TianLingException(404, "该手机号未注册");
        } else if (!code.equals(redisUtils.get(mobile))) {
            // 2.验证码错误则抛出(code=401, msg="验证码错误")
            throw new TianLingException(401, "验证码错误");
        }

        // 3.检验成功则返回userId
        return userEntity.getUserId();
    }

    /*
     * 更新用户信息 service层
     * 1.根据userId来更新用户信息
     */
    @Override
    public void updateUserByUserId(UpdateUserDo updateUserDo, Integer userId) {
        com.alibaba.fastjson.JSONObject res = new com.alibaba.fastjson.JSONObject();
        try {
            BufferedImage image = convert(updateUserDo.getUserImg());
            BufferedImage compressedImage = compress(image); // Compress the image using your compress method
            String fileExtension = getImageFormat(updateUserDo.getUserImg());
            res = minioUtils.uploadBufferedProfileImage(compressedImage, "profile", userId, fileExtension); // Upload the compressed image
        } catch (Exception e) {
            e.printStackTrace();
            res.put("code", 0);
            res.put("msg", updateUserDo.getUserImg());
        }

        // 1.根据userId来更新用户信息
        UserEntity user = this.getUserByUserId(userId);
        user.setUserName(updateUserDo.getUserName());
        user.setUserImg(res.get("msg").toString());
        user.setSex(updateUserDo.getSex());
        user.setArea(updateUserDo.getArea());
        user.setDescription(updateUserDo.getDescription());

        redisUtils.set("user_"+userId, user, 10*60);
        this.updateById(user);
    }

    @Override
    public UserEntity getUserByUserId(Integer userId) {
        UserEntity user = redisUtils.get("user_"+userId, UserEntity.class);
        if (user == null) {
            user = this.lambdaQuery()
                    .eq(UserEntity::getUserId, userId)
                    .one();
            redisUtils.set("user_"+userId, user, 10*60);
        }
        return user;
    }

    @Override
    public void updateFollowNum(Integer userId, Boolean isIncrease) {
        UserEntity user = redisUtils.get("user_"+userId, UserEntity.class);
        if (isIncrease) {
            user.setFollowNum(user.getFollowNum() + 1);
        } else {
            user.setFollowNum(user.getFollowNum() - 1);
        }
        redisUtils.set("user_"+userId, user);
        baseMapper.updateById(user);
    }

    @Override
    public void updateFansNum(Integer userId, Boolean isIncrease) {
        UserEntity user = redisUtils.get("user_"+userId, UserEntity.class);
        if (isIncrease) {
            user.setFollowNum(user.getFansNum() + 1);
        } else {
            user.setFollowNum(user.getFansNum() - 1);
        }
        redisUtils.set("user_"+userId, user);
        baseMapper.updateById(user);
    }
}
