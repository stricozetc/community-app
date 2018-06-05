CREATE DATABASE IF NOT EXISTS `community-app`;
INSERT INTO `community-app`.users (name, password, email, isActive, createdAt, updatedAt) VALUES ('test', 'test', 'defaultEmail1@gmail.com' , 1, '2017-01-31 12:29:23', '2017-01-31 12:29:23');
INSERT INTO `community-app`.users (name, password, email, isActive, createdAt, updatedAt) VALUES ('admin', 'admin', 'defaultEmail2@gmail.com' , 1, '2017-01-31 12:29:23', '2017-01-31 12:29:23');
