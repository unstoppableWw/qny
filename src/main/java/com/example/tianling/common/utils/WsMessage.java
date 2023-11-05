package com.example.tianling.common.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
public class WsMessage<T> {
    private String  type;
    @JsonInclude
    private T data;

    public WsMessage(String type) {
        this.type = type;
        this.data = null;
    }
    public WsMessage(String type, T data) {
        this.type = type;
        this.data = data;
    }
}
