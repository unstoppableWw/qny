package com.example.tianling.common.exception;

import com.example.tianling.common.utils.R;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TianLingExceptionHandler {
    @ExceptionHandler(TianLingException.class)
    public R handleException(TianLingException e) {
        R r = new R();
        r.setCode(e.getCode());
        r.setMsg(e.getMsg());
        return r;
    }
}
