package com.example.tianling.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName(value = "comment")
public class CommentEntity {
    @TableId(value = "comment_id", type = IdType.AUTO)
    private Integer commentId;

    private String userId;

    private String userName;

    private String userImg;

    private String infoId;

    private String parentId;

    private String content;

    private Date createTime;

    private String replyUserId;

    private String replyName;

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setUserImg(String userImg) {
        this.userImg = userImg;
    }

    public void setInfold(String infoId) {
        this.infoId = infoId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public void setContent(String content) {
        this.content = content;
    }



    public void setReplyUserId(String replyUserId) {
        this.replyUserId = replyUserId;
    }

    public void setReplyName(String replyName) {
        this.replyName = replyName;
    }
}
