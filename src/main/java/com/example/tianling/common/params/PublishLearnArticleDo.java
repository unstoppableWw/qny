package com.example.tianling.common.params;

import java.util.List;

public class PublishLearnArticleDo {

    String arctleType;
    String title;
    String context;
    List<String> articleImg;
    String time;



    public String getArctleType() {
        return arctleType;
    }

    public String getTitle() {
        return title;
    }

    public String getContext() {
        return context;
    }

    public String getArticleImg() {
        return articleImg.toString();
    }



    public String getTime() {
        return time;
    }

    public void setArctleType(String arctleType) {
        this.arctleType = arctleType;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public void setArticleImg(List<String> articleImg) {
        this.articleImg = articleImg;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
