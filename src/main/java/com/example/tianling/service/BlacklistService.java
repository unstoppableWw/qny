package com.example.tianling.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.tianling.common.vo.BlackVo;
import com.example.tianling.common.vo.fansVo;
import com.example.tianling.common.vo.followVo;
import com.example.tianling.entity.BlacklistEntity;
import com.example.tianling.entity.FollowEntity;

import java.text.ParseException;
import java.util.List;

public interface BlacklistService extends IService<BlacklistEntity> {
    List<BlackVo> getBlackList(Integer userId);
    Integer insertBalcklist(Integer userId,Integer secondaryUserId) throws ParseException;
    Integer deleteBalcklist(Integer userId,Integer secondaryUserId);
    Integer chackBalcklist(Integer userId,Integer secondaryUserId);

}
