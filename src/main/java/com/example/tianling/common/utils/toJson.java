package com.example.tianling.common.utils;




import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;

import java.util.List;

public class toJson {
    // 创建一个具有title和content属性的JSON对象
    public static JSONObject createJSONObject(String title, String content) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("title", title);
        jsonObject.put("content", content);
        return jsonObject;
    }

    public static JSONObject createJSONObjectList(String title, List<String> content) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("title", title);
        jsonObject.put("labels", content);
        return jsonObject;
    }
}
