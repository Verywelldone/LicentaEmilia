insert into users (id, email, password, username, created_at, is_account_available, last_login) values (1, 'test1@test.com', '$2a$10$l7Q1g6//s9zptAklzawHxOKAkXqsFgHoz9/08DlSjleTc4ZvIllfO', 'user','03/06/2022 01:43',	true,	'03/06/2022 01:44');
insert into users (id, email, password, username, created_at, is_account_available, last_login) values (2, 'test2@test.com', '$2a$10$l7Q1g6//s9zptAklzawHxOKAkXqsFgHoz9/08DlSjleTc4ZvIllfO', 'maintainer','03/06/2022 01:43',	true,	'03/06/2022 01:44');
insert into users (id, email, password, username, created_at, is_account_available, last_login) values (3, 'test3@test.com', '$2a$10$l7Q1g6//s9zptAklzawHxOKAkXqsFgHoz9/08DlSjleTc4ZvIllfO', 'admin','03/06/2022 01:43',	true,	'03/06/2022 01:44');

insert into roles (id, name) values (1,'ROLE_USER');
insert into roles (id, name) values (2,'ROLE_MODERATOR');
insert into roles (id, name) values (3,'ROLE_ADMIN');

insert into user_roles (user_id, role_id) values (1,1);
insert into user_roles (user_id, role_id) values (1,3);

insert into user_roles (user_id, role_id) values (2,1);
insert into user_roles (user_id, role_id) values (2,2);

insert into user_roles (user_id, role_id) values (3,1);
insert into user_roles (user_id, role_id) values (3,2);
insert into user_roles (user_id, role_id) values (3,3);



