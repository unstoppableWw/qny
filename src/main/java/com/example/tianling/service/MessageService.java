package com.example.tianling.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.tianling.common.vo.FriendVo;
import com.example.tianling.common.vo.NoticeMessageVo;
import com.example.tianling.common.vo.SessionVo;
import com.example.tianling.entity.ChatMessageEntity;
import com.example.tianling.entity.FriendEntity;
import com.example.tianling.entity.SessionEntity;

import java.util.List;

public interface MessageService {

    // 会话管理
    SessionEntity createSession(String sessionName);
    SessionEntity findSession(String sessionName);

    // 好友管理
    List<SessionVo> getAllFriendList(Integer userId);
    List<FriendVo> getFriendList(Integer userId);
    void createFriend(Integer sessionId, Integer userId, Integer friendId, Integer type);
    void updateSession(Integer sessionId, Integer userId, String content, boolean isFriend);
    FriendEntity findFriend(Integer sessionId, Integer userId);
    void readMessage(Integer sessionId, Integer userId);

    /*
     * 用户与用户聊天
     */
    // 查看用户信息
    List<ChatMessageEntity> getChatMessageList(Integer sessionId);
    // 发送信息
    void sendChatMessage(Integer sessionId, Integer fromId, Integer toId, String content, Integer type);

    // 通知信息
    List<NoticeMessageVo> getNoticeMessageList(Integer sessionId);
    void sendLikeMessage(Integer sessionId, Integer userId, Integer articleId);
    void sendCommentMessage(Integer sessionId, Integer userId, String content, Integer articleId);

    //  预约信息
    List<ChatMessageEntity> getMessagesByRoomId(String roomId);
    void updateStatus(String roomId);
    void insertReserveMessage(String roomId, Integer userId);
}
