/*insert into product_category (id, description, name, thumbnail)
values (3, 'Diary and eggs', 'diary',
        ' assets/categories/diary-eggs/diary-logo.webp');
*/
insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (21, 'Product Description', ' assets/categories/diary-eggs/butter.webp',
        'Butter', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (22, 'Product Description', ' assets/categories/diary-eggs/cherry-natural-yogurt.webp',
        'Cherry Natural yogurt', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (23, 'Product Description', ' assets/categories/diary-eggs/chocolate-milk.webp',
        'Chocolate milk', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (24, 'Product Description', ' assets/categories/diary-eggs/cream-cheese.webp',
        'Cream Cheese', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (25, 'Product Description', ' assets/categories/diary-eggs/feta.webp',
        'Feta Cheese', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (26, 'Product Description', ' assets/categories/diary-eggs/medium-eggs.webp',
        'Medium Eggs', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (27, 'Product Description',
        'assets/categories/diary-eggs/reduced-fat-milk.webp',
        'Reduced Fat Milk', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (28, 'Product Description', 'assets/categories/diary-eggs/strawberry-greek-yogurt.webp',
        'Greek Strawberry Yogurt', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (29, 'Product Description', 'assets/categories/diary-eggs/white-eggs.webp',
        'White Eggs', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (30, 'Product Description', 'assets/categories/diary-eggs/whole-milk.webp',
        'Whole Milk', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        3);
