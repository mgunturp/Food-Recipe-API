-- Active: 1698737652199@@147.139.210.135@5432@mgp01@public
CREATE TABLE users(
    name VARCHAR,
    umur INTEGER,
    alamat VARCHAR
);

INSERT INTO users (name,umur,alamat) VALUES ('guntur',24,'bandung');

INSERT INTO users (name,umur,alamat) VALUES ('adi',23,'bandung');

INSERT INTO users (name,umur,alamat) VALUES ('asep',22,'cimahi');

SELECT * FROM users;
SELECT * FROM users WHERE alamat='bandung';
SELECT * FROM users ORDER BY umur ASC;

UPDATE users SET alamat='jakarta' WHERE name = 'adi';

DELETE FROM users WHERE name = 'adi';

