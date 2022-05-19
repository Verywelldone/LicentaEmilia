/*insert into product_category (id, description, name, thumbnail)
values (2, 'Cereals and snacks',
        'Cereals', ' assets/categories/cereals-snacks/bakery-logo.webp');*/

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (11, 'Product Description',
        ' assets/categories/cereals-snacks/corn-flakes.webp',
        'Corn flakes', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (12, 'Product Description',
        ' assets/categories/cereals-snacks/dark-chocolate-bar.webp',
        'Dark Chocolate Bar', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (13, 'Product Description',
        ' assets/categories/cereals-snacks/extra-hot-chips.webp',
        'Extra Hot Chips', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (14, 'Product Description',
        'assets/categories/cereals-snacks/hot-potato-chips.webp', 'Hot Potato Chips', ROUND(RAND() * (100), 2),
        ROUND(RAND() * (100), 2),
        ROUND(RAND() * (100), 2), 2);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (15, 'Product Description',
        ' assets/categories/cereals-snacks/ice-cream-pack.webp',
        'Ice Cream Pack', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (16, 'Product Description',
        ' assets/categories/cereals-snacks/milk-chocolate.webp',
        'Milk Chocolate', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (17, 'Product Description',
        ' assets/categories/cereals-snacks/oats-fruit-granola-cereal.webp',
        'Oats and Fruits Cereals', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (18, 'Product Description',
        'assets/categories/cereals-snacks/oats-honey-granola-cereal.webp',
        'Oats and Honey Cereals', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (19, 'Product Description',
        'assets/categories/cereals-snacks/organic-rye-cereal.webp',
        'Organic Rice Cereals', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (20, 'Product Description',
        'assets/categories/cereals-snacks/organic-chocolate-cereal.webp',
        'Organic Chocolate Cereals', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 2);
