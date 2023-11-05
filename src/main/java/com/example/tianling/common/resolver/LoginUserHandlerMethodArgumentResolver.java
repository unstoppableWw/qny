package com.example.tianling.common.resolver;

import com.example.tianling.common.annotation.LoginUser;
import com.example.tianling.common.utils.RedisUtils;
import com.example.tianling.entity.UserEntity;
import com.example.tianling.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.stereotype.Component;
import org.springframework.web.method.support.ModelAndViewContainer;

/*
 * 有@LoginUser注解的方法参数，注入当前登录用户
 */
@Component
public class LoginUserHandlerMethodArgumentResolver implements HandlerMethodArgumentResolver {
    @Autowired
    private UserService userService;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().isAssignableFrom(UserEntity.class) && parameter.hasParameterAnnotation(LoginUser.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        Object userId = webRequest.getAttribute("userId", RequestAttributes.SCOPE_REQUEST);
        if (userId == null) { return null; }

        UserEntity user = userService.getUserByUserId(Integer.parseInt((String) userId));

        return user;
    }


}
