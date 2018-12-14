create table signs(
    id int not null auto_increment primary key,
    openid varchar(100) not null,
    counts int not null,
    nickName varchar(100)
)charset utf8 collate utf8_general_ci