create table loves(
    id int not null auto_increment primary key,
    openid varchar(100) not null,
    nickName varchar(100) not null,
    skillIntro varchar(200) not null,
    skillSalary varchar(25) not null,
    weChatNum varchar(100) not null,
    tag varchar(10) not null,
    avatarUrl varchar(1000) not null
)charset utf8 collate utf8_general_ci


DROP TABLE IF EXISTS `skills`;
create table skills(
    id int not null auto_increment primary key,
    openid varchar(100) not null,
    nickName varchar(100) not null,
    skillIntro varchar(200) not null,
    skillSalary varchar(25) not null,
    weChatNum varchar(100) not null,
    tag varchar(10) not null,
    avatarUrl varchar(1000) not null
)charset utf8 collate utf8_general_ci