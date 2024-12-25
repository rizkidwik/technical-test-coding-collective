/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 101108 (10.11.8-MariaDB-0ubuntu0.24.04.1)
 Source Host           : localhost:3306
 Source Schema         : coding-collective-test

 Target Server Type    : MySQL
 Target Server Version : 101108 (10.11.8-MariaDB-0ubuntu0.24.04.1)
 File Encoding         : 65001

 Date: 26/12/2024 05:51:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `clock_in` varchar(255) DEFAULT NULL,
  `clock_in_tz` varchar(255) DEFAULT NULL,
  `clock_in_location` varchar(255) DEFAULT NULL,
  `clock_in_photo` varchar(255) DEFAULT NULL,
  `clock_out` varchar(255) DEFAULT NULL,
  `clock_out_tz` varchar(255) DEFAULT NULL,
  `clock_out_location` varchar(255) DEFAULT NULL,
  `clock_out_photo` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `clock_in_ip` varchar(255) DEFAULT NULL,
  `clock_out_ip` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roles` enum('ADMIN','USER') DEFAULT 'USER',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
