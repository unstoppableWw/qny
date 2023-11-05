package com.example.tianling.common.params;

import lombok.Data;

@Data
public class UpdateUserDo {
    private String userName;
    private String userImg;
    private Integer sex;
    private String area;
    private String description;
}
