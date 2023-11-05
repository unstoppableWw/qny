package com.example.tianling.WebSocket.config;

import com.example.tianling.WebSocket.handler.UserWebSocketHandler;
import com.example.tianling.WebSocket.interceptor.UserHandshakeInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocket implements WebSocketConfigurer {


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new UserWebSocketHandler(), "/ws")
                .setAllowedOrigins("*")
                .addInterceptors(new UserHandshakeInterceptor());
    }
}
