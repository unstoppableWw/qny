package com.example.tianling.common.exception;

import lombok.Data;

@Data
public class TianLingException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    private int code;
    private String msg;

    public TianLingException(int code, String msg) {
        super(msg);
        this.msg = msg;
        this.code = code;
    }

    public TianLingException(int code, String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
        this.code = code;
    }
}
