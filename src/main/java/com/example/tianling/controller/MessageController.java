package com.example.tianling.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.tianling.common.annotation.Login;
import com.example.tianling.common.annotation.LoginUser;
import com.example.tianling.common.utils.R;
import com.example.tianling.common.vo.NoticeMessageVo;
import com.example.tianling.common.vo.SessionVo;
import com.example.tianling.config.RequestDataHelper;
import com.example.tianling.entity.*;
import com.example.tianling.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
public class MessageController {
    @Autowired
    private MessageService messageService;

    // 会话列表
    @Login
    @PostMapping("/message/list")
    @ResponseBody
    public R getMessageList(@LoginUser UserEntity user) {
        List<SessionVo> sessionList = messageService.getAllFriendList(user.getUserId());
        return R.success(sessionList);
    }

    // 普通用户聊天信息
    @Login
    @PostMapping("/chat_message/detail")
    @ResponseBody
    public R getChatMessageDetail(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer sessionId = paramsJSONObject.getInteger("sessionId");
        RequestDataHelper.setRequestData((long) (sessionId%2));
        List<ChatMessageEntity> messageList = messageService.getChatMessageList(sessionId);
        Collections.reverse(messageList);

        Map<String, Object> map = new HashMap<>();
        map.put("userId", user.getUserId());
        map.put("userImg", user.getUserImg());
        map.put("messageList", messageList);
        return R.success(map);
    }

    // 用户聊天非实时发送信息 (待优化)
    @Login
    @PostMapping("/chat_message/send")
    @ResponseBody
    public R sendChatMessage(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer sessionId = paramsJSONObject.getInteger("sessionId");
        Integer toId = paramsJSONObject.getInteger("toId");
        String content = paramsJSONObject.getString("content");
        Integer type = paramsJSONObject.getInteger("type");
        FriendEntity friend1 = messageService.findFriend(sessionId, user.getUserId());
        if (friend1 == null) {
            messageService.createFriend(sessionId, user.getUserId(), toId, 1);
        }
        FriendEntity friend2 = messageService.findFriend(sessionId, toId);
        if (friend2 == null) {
            messageService.createFriend(sessionId, toId, user.getUserId(), 1);
        }

        messageService.sendChatMessage(sessionId, user.getUserId(), toId, content, type);
        messageService.updateSession(sessionId, user.getUserId(), content, false);
        messageService.updateSession(sessionId, toId, content, true);
        return R.success();
    }

    // 通知信息列表
    @Login
    @PostMapping("/notice_message/detail")
    @ResponseBody
    public R getNoticeMessageDetail(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer sessionId = paramsJSONObject.getInteger("sessionId");

        List<NoticeMessageVo> messageList = messageService.getNoticeMessageList(sessionId);
        Collections.reverse(messageList);

        return R.success(messageList);
    }

    @Login
    @PostMapping("/message/to_chat.do")
    @ResponseBody
    public R toChat(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer targetUserId = paramsJSONObject.getInteger("targetUserId");

        String sessionName = "";
        if (user.getUserId() < targetUserId) {
            sessionName = user.getUserId() + "_" + targetUserId;
        } else {
            sessionName = targetUserId + "_" + user.getUserId();
        }

        SessionEntity session = messageService.findSession(sessionName);
        if (session == null) {
            messageService.createSession(sessionName);
        }
        session = messageService.findSession(sessionName);

        Map<String, Object> map = new HashMap<>();
        map.put("sessionId", session.getSessionId());
        map.put("type", 1);

        return R.success(map);
    }

    @Login
    @PostMapping("/message/read")
    @ResponseBody
    public void readMessage(@RequestBody String params, @LoginUser UserEntity user) {
        JSONObject paramsJSONObject = JSONObject.parseObject(params);
        Integer sessionId = paramsJSONObject.getInteger("sessionId");
        messageService.readMessage(sessionId, user.getUserId());
    }
}
