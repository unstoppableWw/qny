package com.example.tianling.common.utils;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
public class R<T> {
    private int code;
    private String msg;
    @JsonInclude
    private T data;

    // get 方法
    public int getCode() { return code; }
    public String getMsg() { return msg; }
    public T getData() { return data; }

    //构造函数
    public R() {}
    public R(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
    public R(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    /*
     * 封装了两个成功响应的方法
     * success()和success(T data)
     */
    public static <T> R<T> success() {
        return new R<>(200, "success");
    }
    public static <T> R<T> success(T data) {
        return new R<>(200, "success", data);
    }

    /*
     * 封装了一个失败响应的方法
     * error(int code, String msg)
     */
    public static <T> R<T> error(int code, String msg) {
        return new R<>(code, msg);
    }
}
