package com.example.tianling.WebSocket.handler;

import com.example.tianling.common.utils.WsMessage;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.service.Impl.UserServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class UserWebSocketHandler implements WebSocketHandler {
    private static final Gson gson = new GsonBuilder().create();
    // userRegistry存储用户session: key=userId, value=WebSocketSession
    private static final Map<String, WebSocketSession> userRegistry = new ConcurrentHashMap<>();

    private static UserServiceImpl userService;
    @Autowired
    public void setUserService(UserServiceImpl userService) {
        UserWebSocketHandler.userService = userService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 1.根据userId去查询user
        // 这里可用redis优化
        String userId = (String) session.getAttributes().get("userId");
        UserEntity user = userService.getUserByUserId(Integer.parseInt(userId));

        // 2.将用户session添加进userRegistry
        if (userRegistry.containsKey(userId)) {
            WsMessage otherLoginMessage = new WsMessage<>("otherLogin");
            sendMessageToOne(userId, otherLoginMessage);
            userRegistry.remove(userId);
        }
        userRegistry.put(userId, session);

    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        // 获取message中的发送用户from、接收用户target、信息类型type
        String userId = (String) session.getAttributes().get("userId");
        JsonObject json = gson.fromJson((String) message.getPayload(), JsonObject.class);   // json解析message
        String type = json.get("type").getAsString();

        switch (type) {
            case "ping":
                WsMessage pong = new WsMessage<>("pong");
                sendMessageToOne(userId, pong);
                break;
            case "chat":
                JsonObject data = json.get("data").getAsJsonObject();
                String toId = data.get("toId").getAsString();
                userRegistry.get(toId).sendMessage(message);
                break;
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        // 1.根据userId去查询user
        // 这里可用redis优化
        String userId = (String) session.getAttributes().get("userId");
        UserEntity user = userService.getUserByUserId(Integer.parseInt(userId));

        // 2.删除用户的session
        if (session.getId().equals(userRegistry.get(userId).getId())) {
            userRegistry.remove(userId);
        }
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    public void sendMessageToOne(String userId, WsMessage message) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(message));
        if (userRegistry.get(userId) != null) {
            userRegistry.get(userId).sendMessage(textMessage);
        }
    }
}
