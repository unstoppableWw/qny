package com.example.tianling.common.vo;

import lombok.Data;

@Data
public class fansVo {
    private Integer userId;
    private String userName;
    private String userImg;
    private String description;
    private Integer isFollow;
}
