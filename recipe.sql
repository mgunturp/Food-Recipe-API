CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    content TEXT
);
CREATE TABLE users(
    id INT UNIQUE,
    name VARCHAR,
    umur INT,
    address VARCHAR
);

SELECT * from recipes;

INSERT INTO recipes (title,content) VALUES ('sate sapi','mantep enak segar kenyang gokil waduh aku kekenyangan')

ALTER TABLE recipes RENAME COLUMN content TO ingredients;

ALTER TABLE recipes ADD COLUMN photo VARCHAR;

CREATE Table category(
    id INT UNIQUE,
    name VARCHAR
);

INSERT INTO category(id,name) VALUES (1,'main course');
INSERT INTO category(id,name) VALUES (2,'appetizer');
INSERT INTO category(id,name) VALUES (3,'dessert');

ALTER Table recipes ADD COLUMN category_id INT;
ALTER Table recipes ADD COLUMN food_blogger INT;

ALTER Table recipes ALTER COLUMN category_id SET NOT NULL;

--new input--
INSERT INTO recipes (title, ingredients, photo,category_id) VALUES ('ice cream','susu, air, ice','https://picsum.photos/200',3)

ALTER Table recipes ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category(id);
ALTER Table recipes ADD CONSTRAINT fk_food_blogger FOREIGN KEY (food_blogger) REFERENCES users(id);



SELECT * FROM recipes JOIN category ON recipes.category_id=category.id;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id
=category.id;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id
=category.id ORDER BY category_id DESC;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id
=category.id WHERE recipes.title ILIKE '%nasi%' ORDER BY category_id DESC;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id
=category.id WHERE recipes.ingredients ILIKE '%nasi%' ORDER BY category_id ;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id
=category.id ORDER BY recipes.id DESC OFFSET 1 LIMIT 2 ;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id
=category.id WHERE category_id = 1;

SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category, users.name AS author 
FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON recipes.food_blogger = users.id;

CREATE TABLE users(
    uuid VARCHAR UNIQUE,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    username VARCHAR
);

INSERT INTO users(uuid,email,password,username)VALUES('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'admin@recipe.com',
'$argon2i$v=19$m=16,t=2,p=1$eVZTaDdCZ0J1djlST2NDcQ$n18bQSFApiroV8JLmsLV0A','admin recipe');

SELECT * FROM users WHERE email='admin@recipe.com';

ALTER TABLE recipes ADD COLUMN users_id VARCHAR;
ALTER TABLE recipes ALTER COLUMN users_id VARCHAR;

UPDATE recipes SET users_id='1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' WHERE photo='https://picsum.photos/200';

