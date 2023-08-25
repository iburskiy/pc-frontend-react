--SQLite does not support ALTER TABLE statement to add a NOT NULL constraint to the existing table.
--It can be achieved with the following steps. Run line by line.
PRAGMA foreign_keys=off;
ALTER TABLE product RENAME TO product_old;
CREATE TABLE product (
                         "id" INTEGER,
                         "model"	TEXT NOT NULL,
                         "image"	BLOB,
                         "image_name"	TEXT,
                         "year" INTEGER NOT NULL,
                         PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO product SELECT * FROM product_old;
COMMIT;
PRAGMA foreign_keys=on;

--CHECK constraint if needed:
CREATE TABLE product (
                         "id" INTEGER,
                         "model"	TEXT NOT NULL,
                         "image"	BLOB,
                         "image_name"	TEXT,
                         "year" INTEGER NOT NULL,
                         "brand_id" TEXT NOT NULL,
                         "type_id" TEXT NOT NULL,
                         CHECK ( type_id IN ('business','gaming','home', 'universal', 'workstation', 'ultrabook')),
                         PRIMARY KEY("id" AUTOINCREMENT)
);

/*
The goal of SQL query to select all rows from `lkp_product_type` with additional column `isProductExist`.
isProductExist` shows `1` if there is a least one row in `products` table with a given Product Type in `products` table
and `0` otherwise. For that we select only `min(id)` which is enough if more products with such a Product Type exist.
 */
SELECT pt.id, pt.type, CASE WHEN p.model is not NULL THEN 1 ELSE 0 END AS isProductExist
FROM lkp_product_type pt LEFT JOIN product p
ON pt.id = p.type_id and p.id = (select min(id) from product where type_id = pt.id);

-- Select all Products with joined values from Product Lookup tables
select p.id, p.model, p.image, p.image_name, p.code, p.price, years.value AS year, brands.value AS brand, types.value AS type,
    CPUs.value AS cpu, colors.value AS color, graphicsCards.value AS graphicsCard, OStable.value AS os,
    resolutions.value AS resolution, ramTypes.value AS ramType, p.core, p.diagonal, p.ram, p.sizeHD,
    p.refresh_rate AS refreshRate, p.weight, p.thickness, p.cpu_model AS cpuModel, p.url
from product AS p
inner join lkp_product_year AS years on years.id = p.year_id
inner join lkp_product_brand AS brands on brands.id = p.brand_id
inner join lkp_product_type AS types on types.id = p.type_id
inner join lkp_product_cpu AS CPUs on CPUs.id = p.cpu_id
inner join lkp_product_color AS colors on colors.id = p.color_id
inner join lkp_product_graphics AS graphicsCards on graphicsCards.id = p.graphics_id
inner join lkp_product_os AS OStable on OStable.id = p.os_id
inner join lkp_product_resolution AS resolutions on resolutions.id = p.resolution_id
inner join lkp_product_ram_type AS ramTypes on ramTypes.id = p.ram_type_id
--LIMIT 5 OFFSET 10;