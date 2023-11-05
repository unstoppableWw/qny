package com.example.tianling.common.params;
import lombok.Data;

@Data
public class InsertCommentDo {
    private Integer comment_id;     // 评论id
    private String info_id;         // 文章id
    private String content;         // 回复内容
    private String reply_user_id;   // 回复的人的id

    public void setComment_id(Integer comment_id) {
        this.comment_id = comment_id;
    }

    public void setInfo_id(String info_id) {
        this.info_id = info_id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setReply_user_id(String reply_user_id) {
        this.reply_user_id = reply_user_id;
    }

    public Integer getComment_id() {
        return comment_id;
    }

    public String getInfo_id() {
        return info_id;
    }

    public String getContent() {
        return content;
    }

    public String getReply_user_id() {
        return reply_user_id;
    }
}