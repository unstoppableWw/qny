package com.example.tianling.service;


import com.example.tianling.entity.UserPrivacyEntity;

import java.util.List;

public interface UserPrivacyService {
     Integer updata(UserPrivacyEntity userPrivacyEntity, Integer userId);
     UserPrivacyEntity getMySetting(Integer userId);
}
