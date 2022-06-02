insert into product_category (id, description, name, thumbnail)
values (1, 'Bakery products', 'Bakery',
        ' assets/categories/bakery/bakery-logo.webp');

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (1, 'Product Description', ' assets/categories/bakery/bagels.webp',
        'Everything Bagels',
        ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        1);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (2, 'Product Description', ' assets/categories/bakery/baguette.webp',
        'Fresh Plain Baguette', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 1);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (3, 'Product Description',
        ' assets/categories/bakery/banana-chocolate-chip.webp',
        'Banana Chocolate Chip Pound Cake', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        ROUND(RAND() * (100), 2), 1);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (4, 'Product Description', ' assets/categories/bakery/brioche-buns.webp',
        'Fresh Brioche Buns', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        1);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (5, 'Product Description', ' assets/categories/bakery/butter-croissants.webp',
        'Oven-Ready Butter Croissants', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        1);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (6, 'Product Description', ' assets/categories/bakery/chocolate-chunk.webp',
        'Soft-Baked Chocolate Chunk', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), 1);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (7, 'Product Description',
        'assets/categories/bakery/chocolate-croissants.webp',
        'Oven-Ready Chocolate Croissants',
        ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        1);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (8, 'Product Description', 'assets/categories/bakery/fudge-brownies.webp',
        'Chocolate Fudge Brownies', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        1);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (9, 'Product Description', 'assets/categories/bakery/white-bread.webp',
        'Country White Bread', ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        1);

insert into products (id, description, image, name, price, stock, weight, product_category_id)
values (10, 'Product Description',
        'assets/categories/bakery/whole-wheat-bread.webp', 'Whole White Bread',
        ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2), ROUND(RAND() * (100), 2),
        1);
