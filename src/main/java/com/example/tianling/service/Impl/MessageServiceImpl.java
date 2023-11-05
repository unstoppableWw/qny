package com.example.tianling.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.example.tianling.common.vo.FriendVo;
import com.example.tianling.common.vo.NoticeMessageVo;
import com.example.tianling.common.vo.SessionVo;
import com.example.tianling.config.RequestDataHelper;
import com.example.tianling.dao.ChatMessageMapper;
import com.example.tianling.dao.FriendMapper;
import com.example.tianling.dao.NoticeMessageMapper;
import com.example.tianling.dao.SessionMapper;
import com.example.tianling.entity.*;
import com.example.tianling.service.MessageService;
import com.github.yulichang.wrapper.MPJLambdaWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private SessionMapper sessionMapper;

    @Autowired
    private FriendMapper friendMapper;

    @Autowired
    private ChatMessageMapper chatMessageMapper;

    @Autowired
    private NoticeMessageMapper noticeMessageMapper;
    /*
     * 会话管理
     */
    @Override
    public SessionEntity createSession(String sessionName) {
        SessionEntity session = new SessionEntity();
        session.setSessionName(sessionName);
        sessionMapper.insert(session);
        return session;
    }

    @Override
    public SessionEntity findSession(String sessionName) {
        LambdaQueryWrapper<SessionEntity> wrapper = new LambdaQueryWrapper<SessionEntity>()
                .eq(SessionEntity::getSessionName, sessionName);
        return sessionMapper.selectOne(wrapper);
    }

    /*
     * 好友管理
     */
    @Override
    public List<SessionVo> getAllFriendList(Integer userId) {
        MPJLambdaWrapper<Object> wrapper = new MPJLambdaWrapper<>()
                .select(FriendEntity::getSessionId, FriendEntity::getContent, FriendEntity::getTime, FriendEntity::getUnread, FriendEntity::getType)
                .select(UserEntity::getUserId, UserEntity::getUserName, UserEntity::getUserImg)
                .eq(FriendEntity::getUserId, userId)
                .leftJoin(UserEntity.class, UserEntity::getUserId, FriendEntity::getFriendId)
                .orderByDesc(FriendEntity::getTime);

        return friendMapper.selectJoinList(SessionVo.class, wrapper);
    }

    @Override
    public List<FriendVo> getFriendList(Integer userId) {
        MPJLambdaWrapper<Object> wrapper = new MPJLambdaWrapper<>()
                .select(FriendEntity::getSessionId)
                .select(UserEntity::getUserId, UserEntity::getUserName, UserEntity::getUserImg)
                .eq(FriendEntity::getUserId, userId)
                .eq(FriendEntity::getType, 1)
                .leftJoin(UserEntity.class, UserEntity::getUserId, FriendEntity::getFriendId)
                .orderByDesc(FriendEntity::getTime)
                .last("limit 10");

        return friendMapper.selectJoinList(FriendVo.class, wrapper);
    }

    @Override
    public void createFriend(Integer sessionId, Integer userId, Integer friendId, Integer type) {
        LambdaQueryWrapper<FriendEntity> wrapper = new LambdaQueryWrapper<FriendEntity>()
                .eq(FriendEntity::getSessionId, sessionId)
                .eq(FriendEntity::getUserId, userId)
                .eq(FriendEntity::getFriendId, friendId)
                .eq(FriendEntity::getType, type);
        FriendEntity friend = friendMapper.selectOne(wrapper);
        if (friend == null) {
            FriendEntity newfriend = new FriendEntity();
            newfriend.setSessionId(sessionId);
            newfriend.setUserId(userId);
            newfriend.setFriendId(friendId);
            newfriend.setUnread(0);
            newfriend.setType(type);
            friendMapper.insert(newfriend);
        }
    }

    @Override
    public void updateSession(Integer sessionId, Integer userId, String content, boolean isFriend) {
        LambdaUpdateWrapper<FriendEntity> wrapper = new LambdaUpdateWrapper<FriendEntity>()
                .eq(FriendEntity::getSessionId, sessionId)
                .eq(FriendEntity::getUserId, userId)
                .set(FriendEntity::getContent, content)
                .set(FriendEntity::getTime, new Date())
                .setSql(isFriend, "unread = unread + 1");
        friendMapper.update(null, wrapper);
    }

    @Override
    public FriendEntity findFriend(Integer sessionId, Integer userId) {
        LambdaUpdateWrapper<FriendEntity> wrapper = new LambdaUpdateWrapper<FriendEntity>()
                .eq(FriendEntity::getSessionId, sessionId)
                .eq(FriendEntity::getUserId, userId);
        FriendEntity friend = friendMapper.selectOne(wrapper);
        return friend;
    }

    @Override
    public void readMessage(Integer sessionId, Integer userId) {
        LambdaUpdateWrapper<FriendEntity> wrapper = new LambdaUpdateWrapper<FriendEntity>()
                .set(FriendEntity::getUnread, 0)
                .eq(FriendEntity::getSessionId, sessionId)
                .eq(FriendEntity::getUserId, userId);
        friendMapper.update(null, wrapper);
    }


    /*
     * 用户与用户聊天
     */
    @Override
    public List<ChatMessageEntity> getChatMessageList(Integer sessionId) {
        LambdaQueryWrapper<ChatMessageEntity> wrapper = new LambdaQueryWrapper<ChatMessageEntity>()
                .eq(ChatMessageEntity::getSessionId, sessionId)
                .orderByDesc(ChatMessageEntity::getMessageId)
                .last("limit 10");
        return chatMessageMapper.selectList(wrapper);
    }

    @Override
    public void sendChatMessage(Integer sessionId, Integer fromId, Integer toId, String content, Integer type) {
        RequestDataHelper.setRequestData((long) (sessionId%2));
        ChatMessageEntity chatMessage = new ChatMessageEntity();
        chatMessage.setSessionId(sessionId);
        chatMessage.setFromId(fromId);
        chatMessage.setToId(toId);
        chatMessage.setContent(content);
        chatMessage.setStatus(0);
        chatMessage.setTime(new Date());
        chatMessage.setType(type);
        chatMessageMapper.insert(chatMessage);
    }

    /*
     * 通知信息
     */
    @Override
    public List<NoticeMessageVo> getNoticeMessageList(Integer sessionId) {
        MPJLambdaWrapper<Object> wrapper = new MPJLambdaWrapper<>()
                .select(NoticeMessageEntity::getMessageId, NoticeMessageEntity::getUserId,
                        NoticeMessageEntity::getContent, NoticeMessageEntity::getTime, NoticeMessageEntity::getType)
                .select(UserEntity::getUserName, UserEntity::getUserImg)
                .eq(NoticeMessageEntity::getSessionId, sessionId)
                .leftJoin(UserEntity.class, UserEntity::getUserId, NoticeMessageEntity::getUserId)
                .orderByDesc(NoticeMessageEntity::getMessageId)
                .last("limit 10");
        return noticeMessageMapper.selectJoinList(NoticeMessageVo.class, wrapper);
    }

    @Override
    public void sendLikeMessage(Integer sessionId, Integer userId, Integer articleId) {
        NoticeMessageEntity noticeMessage = new NoticeMessageEntity();
        noticeMessage.setSessionId(sessionId);
        noticeMessage.setUserId(userId);
        noticeMessage.setArticleId(articleId);
        noticeMessage.setTime(new Date());
        noticeMessage.setType(0);
        noticeMessageMapper.insert(noticeMessage);
    }

    @Override
    public void sendCommentMessage(Integer sessionId, Integer userId, String content, Integer articleId) {
        NoticeMessageEntity noticeMessage = new NoticeMessageEntity();
        noticeMessage.setSessionId(sessionId);
        noticeMessage.setUserId(userId);
        noticeMessage.setArticleId(articleId);
        noticeMessage.setTime(new Date());
        noticeMessage.setType(0);
        noticeMessageMapper.insert(noticeMessage);
    }

    @Override
    public List<ChatMessageEntity> getMessagesByRoomId(String roomId) {
        return null;
    }

    @Override
    public void updateStatus(String roomId) {

    }

    @Override
    public void insertReserveMessage(String roomId, Integer userId) {

    }


//    @Override
//    public List<ChatMessageEntity> getMessagesByRoomId(String roomId) {
//        List<ChatMessageEntity> messageList = this.lambdaQuery()
//                .eq(ChatMessageEntity::getContent, roomId)
//                .list();
//        return messageList;
//    }
//
//    @Override
//    public void updateStatus(String roomId) {
//        this.lambdaUpdate()
//                .eq(ChatMessageEntity::getContent, roomId)
//                .set(ChatMessageEntity::getStatus, 0)
//                .update();
//    }
//
//    @Override
//    public void insertReserveMessage(String roomId, Integer userId) {
//        ChatMessageEntity message = new ChatMessageEntity();
//        message.setFromId(-2);
//        message.setToId(userId);
//        message.setSessionId(0);
//        message.setContent(roomId);
//        message.setStatus(-1);
//    }
}
