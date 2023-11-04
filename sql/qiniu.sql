/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : qiniu

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 04/11/2023 21:21:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` tinyint NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `create_time` datetime NOT NULL,
  `view_num` int NOT NULL,
  `like_num` int NOT NULL,
  `save_num` int NOT NULL,
  `article_img` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`article_id`) USING BTREE,
  UNIQUE INDEX `articleId`(`article_id` ASC) USING BTREE,
  INDEX `userId`(`user_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1758 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of article
-- ----------------------------

-- ----------------------------
-- Table structure for blacklist
-- ----------------------------
DROP TABLE IF EXISTS `blacklist`;
CREATE TABLE `blacklist`  (
  `primary_user_id` int NOT NULL,
  `secondary_user_id` int NOT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`primary_user_id`, `secondary_user_id`) USING BTREE,
  INDEX `secondary_user_id`(`secondary_user_id` ASC) USING BTREE,
  CONSTRAINT `blacklist_ibfk_1` FOREIGN KEY (`primary_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `blacklist_ibfk_2` FOREIGN KEY (`secondary_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of blacklist
-- ----------------------------

-- ----------------------------
-- Table structure for chat_message_0
-- ----------------------------
DROP TABLE IF EXISTS `chat_message_0`;
CREATE TABLE `chat_message_0`  (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `session_id` int NOT NULL,
  `from_id` int NOT NULL,
  `to_id` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `status` tinyint NOT NULL,
  `time` datetime NOT NULL,
  `type` tinyint NOT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 87 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of chat_message_0
-- ----------------------------

-- ----------------------------
-- Table structure for chat_message_1
-- ----------------------------
DROP TABLE IF EXISTS `chat_message_1`;
CREATE TABLE `chat_message_1`  (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `session_id` int NOT NULL,
  `from_id` int NOT NULL,
  `to_id` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `status` tinyint NOT NULL,
  `time` datetime NOT NULL,
  `type` tinyint NOT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of chat_message_1
-- ----------------------------

-- ----------------------------
-- Table structure for chat_message_2
-- ----------------------------
DROP TABLE IF EXISTS `chat_message_2`;
CREATE TABLE `chat_message_2`  (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `session_id` int NOT NULL,
  `from_id` int NOT NULL,
  `to_id` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `status` tinyint NOT NULL,
  `time` datetime NOT NULL,
  `type` tinyint NOT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of chat_message_2
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `comment_id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_id` int NOT NULL COMMENT '用户id',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名字',
  `user_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户头像',
  `info_id` int NOT NULL COMMENT '文章id',
  `parent_id` int NOT NULL DEFAULT -1 COMMENT '父id',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '回复内容',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `reply_user_id` int NULL DEFAULT NULL COMMENT '回复对象id',
  `reply_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '回复对象名字',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1126 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback`  (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `complain_user_id` int NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `is_processed` int NULL DEFAULT NULL,
  `reflect_imgs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`feedback_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of feedback
-- ----------------------------

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow`  (
  `user_id` int NOT NULL,
  `follow_user_id` int NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`user_id`, `follow_user_id`) USING BTREE,
  INDEX `followUserId`(`follow_user_id` ASC) USING BTREE,
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follow_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of follow
-- ----------------------------

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend`  (
  `user_id` int NULL DEFAULT NULL,
  `friend_id` int NULL DEFAULT NULL,
  `session_id` int NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `time` datetime NULL DEFAULT NULL,
  `unread` int NULL DEFAULT NULL,
  `type` tinyint NULL DEFAULT NULL
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of friend
-- ----------------------------

-- ----------------------------
-- Table structure for like_info
-- ----------------------------
DROP TABLE IF EXISTS `like_info`;
CREATE TABLE `like_info`  (
  `user_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `article_id`) USING BTREE,
  INDEX `article_id`(`article_id` ASC) USING BTREE,
  CONSTRAINT `like_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `like_info_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of like_info
-- ----------------------------

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_id` int NOT NULL,
  `to_id` int NOT NULL,
  `conversation_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int NOT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  `is_invite` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 377 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of message
-- ----------------------------

-- ----------------------------
-- Table structure for notice_message
-- ----------------------------
DROP TABLE IF EXISTS `notice_message`;
CREATE TABLE `notice_message`  (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `session_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `article_id` int NOT NULL,
  `time` datetime NOT NULL,
  `type` tinyint NOT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notice_message
-- ----------------------------

-- ----------------------------
-- Table structure for save_info
-- ----------------------------
DROP TABLE IF EXISTS `save_info`;
CREATE TABLE `save_info`  (
  `user_id` int NOT NULL,
  `article_id` int NOT NULL,
  `save_time` datetime NOT NULL,
  PRIMARY KEY (`user_id`, `article_id`) USING BTREE,
  INDEX `article_id`(`article_id` ASC) USING BTREE,
  CONSTRAINT `save_info_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `save_info_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of save_info
-- ----------------------------

-- ----------------------------
-- Table structure for session
-- ----------------------------
DROP TABLE IF EXISTS `session`;
CREATE TABLE `session`  (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `session_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`session_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of session
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_img` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mobile` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sex` tinyint NULL DEFAULT NULL,
  `area` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `follow_num` int NOT NULL,
  `fans_num` int NOT NULL,
  `article_num` int NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `userId`(`user_id` ASC) USING BTREE,
  UNIQUE INDEX `userName`(`user_name` ASC) USING BTREE,
  UNIQUE INDEX `mobile`(`mobile` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11012 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (-1, '通知小助手', 'http://120.26.76.250:9000/profile/-1/-1.jpeg', '-1', '-1', -1, '广东省', '通知小助手', 0, 0, 0);
INSERT INTO `user` VALUES (1, '小天老师', 'http://120.26.76.250:9000/profile/1/1.jpeg', '13432181408', '13432181408', 0, '广东省', '登上顶峰的斗争总是让人向往', 2, 0, 2);
INSERT INTO `user` VALUES (2, '排', 'http://120.26.76.250:9000/profile/2/2.jpeg', '15119908320', '15119908320', 1, '河北省', '回家干活', 0, 0, 0);
INSERT INTO `user` VALUES (3, '金维', 'http://120.26.76.250:9000/profile/3/3.jpeg', '15570648997', '15570648997', 1, '广东省', '无', 0, 0, 3);
INSERT INTO `user` VALUES (4, '七七😀', 'http://120.26.76.250:9000/profile/4/4.jpeg', '13828234634', '13828234634', 0, '广东省', '世故而不世故', 1, 0, 2);
INSERT INTO `user` VALUES (5, 'Ainch', 'http://120.26.76.250:9000/profile/5/5.jpeg', '18718217629', '18718217629', 1, '广东省', '11111111', 1, 0, 6);
INSERT INTO `user` VALUES (6, '开哥', 'http://120.26.76.250:9000/profile/6/6.jpeg', '13672658659', '13672658659', 1, '', '无', 1, 0, 16);
INSERT INTO `user` VALUES (10001, 'calm', 'http://120.26.76.250:9000/profile/10001/10001.jpeg', '1', '1', 1, '1', '自洽', 2, 0, 22);

-- ----------------------------
-- Table structure for user_privacy
-- ----------------------------
DROP TABLE IF EXISTS `user_privacy`;
CREATE TABLE `user_privacy`  (
  `user_id` int NOT NULL,
  `view_my_posts` tinyint(1) NULL DEFAULT 1,
  `view_my_favorites` tinyint(1) NULL DEFAULT 1,
  `allow_private_messages` tinyint(1) NULL DEFAULT 1,
  `display_profile` tinyint(1) NULL DEFAULT 1,
  `display_location` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`user_id`) USING BTREE,
  CONSTRAINT `user_privacy_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_privacy
-- ----------------------------
INSERT INTO `user_privacy` VALUES (1, 1, 1, 1, 1, 1);
INSERT INTO `user_privacy` VALUES (2, 0, 1, 1, 1, 0);
INSERT INTO `user_privacy` VALUES (3, 1, 1, 1, 1, 1);
INSERT INTO `user_privacy` VALUES (4, 1, 1, 1, 1, 1);
INSERT INTO `user_privacy` VALUES (5, 1, 1, 1, 1, 1);
INSERT INTO `user_privacy` VALUES (6, 1, 1, 1, 1, 1);
INSERT INTO `user_privacy` VALUES (10001, 1, 1, 1, 1, 1);

-- ----------------------------
-- Triggers structure for table user
-- ----------------------------
DROP TRIGGER IF EXISTS `user_insert_trigger`;
delimiter ;;
CREATE TRIGGER `user_insert_trigger` AFTER INSERT ON `user` FOR EACH ROW BEGIN
    INSERT INTO user_privacy (user_id, view_my_posts, view_my_favorites, allow_private_messages, display_profile, display_location)
    VALUES (NEW.user_id, 1, 1, 1, 1, 1);
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
