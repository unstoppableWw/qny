package com.example.tianling.common.interceptor;

import com.example.tianling.common.annotation.Login;
import com.example.tianling.common.exception.TianLingException;
import com.example.tianling.common.utils.JwtUtils;
import com.example.tianling.common.utils.RedisUtils;
import io.jsonwebtoken.Claims;
import org.junit.platform.commons.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;
import java.util.Date;

/*
 * Token拦截器
 */
@Component
public class AuthorizationInterceptor implements HandlerInterceptor {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RedisUtils redisUtils;

    private static final Logger logger = LoggerFactory.getLogger(AuthorizationInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Login annotation;
        // 接收Login注解
        if (handler instanceof HandlerMethod) {
            annotation = ((HandlerMethod) handler).getMethodAnnotation(Login.class);
        } else {
            return true;
        }

        // 非Login注解则不用验证
        if (annotation == null) { return true; }

        String token = request.getHeader("token");
        // token为空
        if (StringUtils.isBlank(token)) {
            throw new TianLingException(998, "token不能为空");
        }
        //token过期
        Claims claims = jwtUtils.getClaimByToken(token);
        if (claims == null || jwtUtils.isTokenExpired(claims.getExpiration())) {
            throw new TianLingException(998, "token失效，请重新登录");
        }

        String userId = claims.getSubject();

        String redisToken = redisUtils.get(userId+"Token");
        Claims redisClaims = jwtUtils.getClaimByToken(redisToken);

        if (redisToken == null) {
            redisUtils.set(userId+"Token", token, 24*60);
        } else if (redisToken != token) {
            Date redisTokenDate = redisClaims.getIssuedAt();
            Date tokenDate = claims.getIssuedAt();
            if (tokenDate.getTime() >= redisTokenDate.getTime()) {
                redisUtils.set(userId+"Token", token, 24*60);
            } else {
                throw new TianLingException(999, "账号已在别处登录,请重新登录");
            }
        }

        // 设置userId到request中
        request.setAttribute("userId", userId);

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }
}
