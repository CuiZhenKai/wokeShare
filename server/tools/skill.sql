DROP TABLE IF EXISTS `loves`;
create table loves(
    id int not null auto_increment primary key,
    openid varchar(100) not null,
    datas varchar(2000) not null
)charset utf8 collate utf8_general_ci


alter table skills add avatarUrl varchar(1000) not null 