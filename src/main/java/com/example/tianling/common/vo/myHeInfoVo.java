package com.example.tianling.common.vo;

import lombok.Data;

@Data
public class myHeInfoVo {
    private String authorImg;
    private String HisName;

    private String myImg;
    private String myName;
    private String myId;

    public myHeInfoVo(String authorImg, String hisName, String myImg, String myName ,String myId) {
        this.authorImg = authorImg;
        HisName = hisName;
        this.myImg = myImg;
        this.myName = myName;
        this.myId = myId;
    }
}
