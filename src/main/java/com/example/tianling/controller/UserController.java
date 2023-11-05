package com.example.tianling.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.tianling.common.annotation.Login;
import com.example.tianling.common.annotation.LoginUser;
import com.example.tianling.common.params.RegisterDo;
import com.example.tianling.common.params.UpdateUserDo;
import com.example.tianling.common.utils.JwtUtils;
import com.example.tianling.common.utils.R;
import com.example.tianling.common.utils.RandomUtils;
import com.example.tianling.common.utils.RedisUtils;
import com.example.tianling.common.vo.*;
import com.example.tianling.entity.*;
import com.example.tianling.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private RedisUtils redisUtils;

    @Autowired
    private RandomUtils randomUtils;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private FollowService followService;

    @Autowired
    private ForumService forumService;

    @Autowired
    private BlacklistService blacklistService;
    @Autowired
    private UserPrivacyService userPrivacyService;
    /*
     * 发送验证码 controller层
     * 1.Json解析接收的mobile值
     * 2.random工具类生成验证码并发送给mobile
     * 3.发功成功则存入redis并返回成功响应
     * 4.发送失败则返回失败响应(code=400, msg="验证码请求失败")
     */
    @PostMapping("/user/send_smscode.do")
    @ResponseBody
    public R sendSmsCode(@RequestBody String params) throws Exception {
        // 1.Json解析接收的mobile值
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String mobile = paramsJSONObject.getString("mobile");

        // 2.random工具类生成验证码并发送给mobile
        String code = randomUtils.getRandomCode();
        boolean isSend = userService.sendSMS(mobile, code);

        if (isSend) {
            // 3.发功成功则存入redis并返回成功响应
            redisUtils.set(mobile, code, 100);      // 测试时间,后续需修改
            return R.success();
        } else {
            // 4.发送失败则返回失败响应(code=400, msg="验证码请求失败")
            return R.error(400, "验证码请求失败");
        }
    }

    /*
     * 用户注册 controller层
     */
    @PostMapping("/user/register.do")
    @ResponseBody
    public R register(@RequestBody RegisterDo registerDo) {
        userService.register(registerDo);
        return R.success();
    }

    /*
     * 密码登录 controller层
     * 1.Json解析收到的mobile和password
     * 2.验证成功则返回userId
     * 3.生成封装userId的token并发出成功响应
     */
    @PostMapping("/user/password_login.do")
    @ResponseBody
    public R passwordLogin(@RequestBody String params) {
        // 1.Json解析接收的mobile和password
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String mobile = paramsJSONObject.getString("mobile");
        String password = paramsJSONObject.getString("password");

        // 2.验证成功则返回userId
        Integer userId = userService.passwordLogin(mobile, password);

        // 3.生成封装userId的token并发出成功响应
        String token = jwtUtils.generateTkoken(userId);
        Map<String, Object> map = new HashMap<>();
        map.put("token",token);

        return R.success(map);
    }

    /*
     * 验证码登录 controller层
     * 1.Json解析收到的mobile和code
     * 2.验证成功则返回userId
     * 3.生成封装userId的token并发出成功响应
     */
    @PostMapping("/user/smscode_login.do")
    @ResponseBody
    public R smscodeLogin(@RequestBody String params) {
        // 1.Json解析接收的mobile和password
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        String mobile = paramsJSONObject.getString("mobile");
        String code = paramsJSONObject.getString("code");

        // 2.验证成功则返回userId
        Integer userId = userService.smscodeLogin(mobile, code);

        // 3.生成封装userId的token并发出成功响应
        String token = jwtUtils.generateTkoken(userId);
        Map<String, Object> map = new HashMap<>();
        map.put("token",token);

        return R.success(map);
    }

    /*
     * 更新用户信息
     * 1.根据已登录的用户user更新其信息
     * 存在一个问题:: 图片如何转成服务器中的url
     */
    @Login
    @PostMapping("/user/update_user.do")
    @ResponseBody
    public R updateUser(@RequestBody UpdateUserDo updateUserDo, @LoginUser UserEntity user) {
        userService.updateUserByUserId(updateUserDo, user.getUserId());
        return R.success();
    }

    /*
     * 退出
     * 1.删除redis中的user
     * 2.前端要删除token并跳转到登录页
     */
    @Login
    @PostMapping("/user/logout.do")
    @ResponseBody
    public R logout(@LoginUser UserEntity user){
        // 1.删除redis中的user
        redisUtils.delete(user.getUserId().toString());
        return R.success();
    }

    /*
     * 加载个人信息
     */
    @Login
    @PostMapping("/user/my")
    @ResponseBody
    public R userMy(@LoginUser UserEntity user) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", user.getUserId());
        map.put("userImg", user.getUserImg());
        map.put("userName", user.getUserName());
        map.put("sex", user.getSex());
        map.put("area", user.getArea());
        map.put("description", user.getDescription());
        map.put("followNum", user.getFollowNum());
        map.put("fansNum", user.getFansNum());
        map.put("articleNum", user.getArticleNum());
        return R.success(map);
    }

    @Login
    @PostMapping("/user/he")
    @ResponseBody
    public R userHe(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer userId = paramsJSONObject.getInteger("userId");
        UserEntity targetUser = userService.getUserByUserId(userId);
        Map<String, Object> map = new HashMap<>();
        map.put("userId", targetUser.getUserId());
        map.put("userImg", targetUser.getUserImg());
        map.put("userName", targetUser.getUserName());
        map.put("sex", targetUser.getSex());
        map.put("area", targetUser.getArea());
        map.put("description", targetUser.getDescription());
        map.put("followNum", targetUser.getFollowNum());
        map.put("fansNum", targetUser.getFansNum());
        map.put("articleNum", targetUser.getArticleNum());

        FollowEntity follow = followService.checkFollow(user.getUserId(), targetUser.getUserId());
        if (follow != null) {map.put("follow", 1);}
        else {map.put("follow", 0);}
        return R.success(map);
    }


    /*
     * 加载我的帖子
     */
    @Login
    @PostMapping("/user/myArticle")
    @ResponseBody
    public R getMyArticle(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer page = paramsJSONObject.getInteger("page");

        IPage<articleCommonVo> myArticle = articleService.getMyArticle(user.getUserId(), page);
        for (articleCommonVo article0 : myArticle.getRecords()) {
            Boolean like = forumService.is_follow_like_save(user.getUserId().toString(),article0.getArticleId().toString(),"like");
            Boolean save = forumService.is_follow_like_save(user.getUserId().toString(),article0.getArticleId().toString().toString(),"save");
            Integer like_now = like ? 1 : 0;
            Integer save_now = save ? 1 : 0;
            article0.setLike(like_now);
            article0.setSave(save_now);
        }
        return R.success(myArticle.getRecords());
    }

    /*
     * 加载我收藏的帖子
     */
    @Login
    @PostMapping("/user/saveArticle")
    @ResponseBody
    public R getSaveArticle(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer page = paramsJSONObject.getInteger("page");

        IPage<articleCommonVo> saveArticle = articleService.getSaveArticle(user.getUserId(), page);
        for (articleCommonVo article0 : saveArticle.getRecords()) {
            Boolean like = forumService.is_follow_like_save(user.getUserId().toString(),article0.getArticleId().toString(),"like");
            Boolean save = forumService.is_follow_like_save(user.getUserId().toString(),article0.getArticleId().toString().toString(),"save");
            Integer like_now = like ? 1 : 0;
            Integer save_now = save ? 1 : 0;
            article0.setLike(like_now);
            article0.setSave(save_now);
        }
        return R.success(saveArticle.getRecords());
    }

    /*
     * 关注列表
     */
    @Login
    @PostMapping("/user/follow")
    @ResponseBody
    public R getFollowList(@LoginUser UserEntity user) {
        List<followVo> followList = followService.getFollowList(user.getUserId());
        return R.success(followList);
    }

    /*
     * 关注列表
     */
    @Login
    @PostMapping("/user/fans")
    @ResponseBody
    public R getFansList(@LoginUser UserEntity user){
        List<fansVo> fansList = followService.getFansList(user.getUserId());
        for (fansVo fans : fansList) {
            FollowEntity follow = followService.checkFollow(user.getUserId(), fans.getUserId());
            if (follow != null) {fans.setIsFollow(1);}
            else {fans.setIsFollow(0);}
        }
        return R.success(fansList);
    }



    /*
     * 加载他的帖子
     */
    @Login
    @PostMapping("/user/heArticle")
    @ResponseBody
    public R getHeArticle(@RequestBody String params,@LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer userId = paramsJSONObject.getInteger("userId");
        System.out.println(user.getUserId());
        Integer isInBlack = blacklistService.chackBalcklist(userId,user.getUserId());
        if(isInBlack==1){
            return R.success("你已被加入黑名单");
        }

        UserPrivacyEntity isAdmin = userPrivacyService.getMySetting(userId);
        if(isAdmin.getViewMyPosts()!=1){
            return R.success("不允许查看");
        }
        Integer page = paramsJSONObject.getInteger("page");
        IPage<articleCommonVo> myArticle = articleService.getMyArticle(userId, page);
        for (articleCommonVo article0 : myArticle.getRecords()) {
            Boolean like = forumService.is_follow_like_save(user.getUserId().toString(),article0.getArticleId().toString(),"like");
            Boolean save = forumService.is_follow_like_save(user.getUserId().toString(),article0.getArticleId().toString().toString(),"save");
            Integer like_now = like ? 1 : 0;
            Integer save_now = save ? 1 : 0;
            article0.setLike(like_now);
            article0.setSave(save_now);
        }
        return R.success(myArticle.getRecords());
    }

    /*
     * 加载他收藏的帖子
     */
    @Login
    @PostMapping("/user/heSaveArticle")
    @ResponseBody
    public R getHeSaveArticle(@RequestBody String params,@LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer userId = paramsJSONObject.getInteger("userId");
        Integer page = paramsJSONObject.getInteger("page");
        Integer isInBlack = blacklistService.chackBalcklist(userId,user.getUserId());
        if(isInBlack==1){
            return R.success("你已被加入黑名单");
        }

        UserPrivacyEntity isAdmin = userPrivacyService.getMySetting(userId);
        if(isAdmin.getViewMyFavorites()!=1){
            return R.success("不允许查看");
        }
        IPage<articleCommonVo> saveArticle = articleService.getSaveArticle(userId, page);
        for (articleCommonVo article0 : saveArticle.getRecords()) {
            Boolean like = forumService.is_follow_like_save(user.getUserId().toString(),article0.getArticleId().toString(),"like");
            Boolean save = forumService.is_follow_like_save(user.getUserId().toString(),article0.getArticleId().toString().toString(),"save");
            Integer like_now = like ? 1 : 0;
            Integer save_now = save ? 1 : 0;
            article0.setLike(like_now);
            article0.setSave(save_now);
        }
        return R.success(saveArticle.getRecords());
    }

    /*
     * 关注
     */
    @Login
    @PostMapping("/user/follow.do")
    @ResponseBody
    public R follow(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer followUserId = paramsJSONObject.getInteger("followUserId");

        followService.followUser(user.getUserId(), followUserId);
        userService.updateFollowNum(user.getUserId(), true);
        userService.updateFansNum(followUserId, true);
        return R.success();
    }

    /*
     * 取消关注
     */
    @Login
    @PostMapping("/user/cancel_follow.do")
    @ResponseBody
    public R cancelFollow(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer followUserId = paramsJSONObject.getInteger("followUserId");

        followService.cancelFollowUser(user.getUserId(), followUserId);
        userService.updateFollowNum(user.getUserId(), false);
        userService.updateFansNum(followUserId, false);
        return R.success();
    }
}