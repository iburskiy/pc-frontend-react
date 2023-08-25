-- All tables should be created with TypeORM automatically by running backend application.
INSERT INTO lkp_product_year (value) VALUES ('2023');
INSERT INTO lkp_product_year (value) VALUES ('2022');
INSERT INTO lkp_product_year (value) VALUES ('2021');

INSERT INTO lkp_product_brand (value) VALUES ('Apple');
INSERT INTO lkp_product_brand (value) VALUES ('Asus');
INSERT INTO lkp_product_brand (value) VALUES ('Dell');
INSERT INTO lkp_product_brand (value) VALUES ('HP');
INSERT INTO lkp_product_brand (value) VALUES ('Lenovo');
INSERT INTO lkp_product_brand (value) VALUES ('Acer');
INSERT INTO lkp_product_brand (value) VALUES ('MSI');

INSERT INTO lkp_product_type (value) VALUES ('universal');
INSERT INTO lkp_product_type (value) VALUES ('business');
INSERT INTO lkp_product_type (value) VALUES ('gaming');
INSERT INTO lkp_product_type (value) VALUES ('desktop');
INSERT INTO lkp_product_type (value) VALUES ('ultrabook');

INSERT INTO lkp_product_cpu (id,value)
VALUES
    (1,'Intel Core i3'),
    (2,'Intel Core i5'),
    (3,'Intel Core i7'),
    (4,'Intel Core i9'),
    (5,'Apple M2 Pro'),
    (6,'AMD Ryzen 3 '),
    (7,'Apple M1 Max'),
    (8,'AMD Ryzen 7'),
    (9,'Intel Celeron '),
    (10,'Apple M2');

INSERT INTO lkp_product_color (id,value)
VALUES
    (1,'black'),
    (2,'silver'),
    (3,'dark silver'),
    (4,'blue'),
    (5,'gray');

INSERT INTO lkp_product_graphics (id,value)
VALUES (1,'NVIDIA GeForce RTX'),
     (2,'Intel Iris Xe Graphics'),
     (3,'19-Core GPU'),
     (4,'Intel UHD Graphics'),
     (5,'AMD Radeon Graphics'),
     (6,'32-Core GPU'),
     (7,'16-Core GPU'),
     (8,'Intel HD Graphics '),
     (9,' 8-Core GPU');

INSERT INTO lkp_product_os (id,value)
VALUES (1,'DOS'),
       (2,'Windows 11 Home'),
       (3,'macOS'),
       (4,'Linux'),
       (5,'Windows 11 Pro'),
       (6,' Windows 10 Pro'),
       (7,'Chrome OS');

INSERT INTO lkp_product_resolution (id,value)
VALUES (1,'1920 x 1080 (FullHD)'),
       (2,'2560 x 1600'),
       (3,'3456 x 2234'),
       (4,'3024x1964'),
       (5,'3200 x 2000'),
       (6,'3840 x 2400'),
       (7,'2880 x 1800'),
       (8,'1366 x 768 ');

INSERT INTO lkp_product_ram_type (value) VALUES ('Unified');
INSERT INTO lkp_product_ram_type (value) VALUES ('DDR5');
INSERT INTO lkp_product_ram_type (value) VALUES ('DDR4');


INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('model', NULL, 'search', 1);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('code',NULL, 'search', 1);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('price', NULL, 'range', 1);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('year_id', (SELECT group_concat(value) FROM lkp_product_year), 'list', 1);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('brand_id', (SELECT group_concat(value) FROM lkp_product_brand), 'list', 1);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('type_id', (SELECT group_concat(value) FROM lkp_product_type), 'list', 1);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('cpu_id', (SELECT group_concat(value) FROM lkp_product_cpu), 'list', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('color_id', (SELECT group_concat(value) FROM lkp_product_color), 'list', 1);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('graphics_id', (SELECT group_concat(value) FROM lkp_product_graphics), 'list', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('os_id', (SELECT group_concat(value) FROM lkp_product_os), 'list', 1);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('resolution_id', (SELECT group_concat(value) FROM lkp_product_resolution), 'list', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('ram_type_id', (SELECT group_concat(value) FROM lkp_product_ram_type), 'list', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('ram',NULL, 'range', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('core', NULL, 'range', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('diagonal',NULL, 'range', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('sizeHD',NULL, 'range', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('refresh_rate',NULL, 'range', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('weight',NULL, 'range', 0);
INSERT INTO product_field (product_field, lookup_table_values, filter_type, filterable) VALUES ('thickness',NULL, 'range', 0);


INSERT INTO product (model,image,image_name,code,price,year_id,brand_id,type_id,cpu_id,color_id,graphics_id,os_id,resolution_id,ram_type_id,ram,core,diagonal,sizeHD,refresh_rate,weight,thickness,cpu_model,graphics_model,url)
VALUES
    ('HP 15.6"" ProBook 450 G9 Laptop',null,'','HEPB450687P3',1069.99,2,4,1,2,2,1,2,1,3,16,10,15.6,512,60,1174,199,'1255U','','https://www.bhphotovideo.com/c/product/1707095-REG/hp_687p3ut_aba_probook_450_g9_i7_1255u.html'),
    ('Apple 16"" MacBook Pro',null,'','APMBM2P1T16G',2699.99,2,1,1,5,1,3,3,3,1,16,12,16.0,1000,120,2150,null,'','','https://www.bhphotovideo.com/c/product/1746362-REG/'),
    ('ASUS 15.6"" TUF Gaming F15 Laptop',null,'','ASFX507ZMB74',1149.0,3,2,3,2,1,1,2,1,2,16,11,15.6,1000,144,2300,247,'','4080','https://www.bhphotovideo.com/c/product/1702433-REG/asus_fx507zm_bs74_tuf_i7_12700h_16gb_1tb.html'),
    ('Lenovo 16"" IdeaPad Slim 5 Notebook',null,'','LE82XF0012US',629.0,1,5,1,3,2,1,2,1,2,8,6,16.0,512,60,1139,169,'1335U','','https://www.bhphotovideo.com/c/product/1762578-REG/lenovo_82xf0012us_16_slim_5i_laptop.html'),
    ('ASUS 16"" ProArt StudioBook OLED 16 Series Laptop',null,'','ASH7600ZWDB7',1799.0,2,2,1,2,1,1,2,1,2,16,16,16.0,1000,60,2400,199,'','4080','https://www.bhphotovideo.com/c/product/1711535-REG/asus_h7600zwdb76_pa_i7_12700h_16_1_1tb_rtx3070_w11_16.html'),
    ('Dell 23.8" OptiPlex 5400 All-in-One Desktop Computer',null,'','DEO5400NVGMV',1330.86,2,3,4,2,1,4,5,1,3,16,6,23.8,256,null,null,null,'','770','https://www.bhphotovideo.com/c/product/1711454-REG/dell_nvgmv_optiplex_5400_aio_i5_12500.html'),
    ('Lenovo 23.8" IdeaCentre 3i Multi-Touch All-in-One Desktop Computer',null,'','LEF0GH00PUUS',729.0,2,5,4,2,1,4,2,1,3,8,8,23.8,256,null,null,null,'','','https://www.bhphotovideo.com/c/product/1762508-REG/lenovo_f0gh00puus_23_8_ideacenter_aio_3i.html'),
    ('HP 23.8" EliteOne 840 G9 All-in-One Desktop Computer',null,'','HE69S91UT',1299.0,2,4,4,2,2,4,5,1,2,16,6,23.8,512,null,null,null,'','770','https://www.bhphotovideo.com/c/product/1718093-REG/hp_69s91ut_aba_eliteone_840_g9_23_8.html'),
    ('Lenovo 23.8" IdeaCentre 3 All-in-One Desktop Computer',null,'','LEF0G100QGUS',529.0,1,5,4,6,1,5,2,1,3,8,4,23.8,256,null,null,null,'7330U','','https://www.bhphotovideo.com/c/product/1762506-REG/lenovo_f0g100qgus_23_8_ideacenter_aio_3.html'),
    ('Lenovo 15.6" IdeaPad Slim 3 Notebook',null,'','LE82X70005US',449.0,1,5,1,1,4,4,2,1,2,8,null,15.6,256,null,null,null,'1315U ','','https://www.bhphotovideo.com/c/product/1762582-REG/lenovo_82x70005us_15_6_ideapad_slim_3.html/fci/35801'),
    ('HP 15.6" ProBook 450 G9 Laptop',null,'','HEPB450687N8',928.95,1,4,2,2,2,2,5,1,3,8,10,15.6,256,null,null,null,'1235U','','https://www.bhphotovideo.com/c/product/1703601-REG/hp_687n8ut_aba_probook_450_g9_i5_1235u.html'),
    ('Acer 15.6" Aspire 5 Notebook ',null,'','ACA51557748P',649.99,2,6,2,3,5,2,2,1,3,16,null,15.6,512,null,null,null,'','','https://www.bhphotovideo.com/c/product/1722156-REG/acer_nx_k3kaa_007_15_6_aspire_5_a515_57_748p.html'),
    ('ASUS 13.4" ROG Flow Z13 2-in-1 Gaming Laptop',null,'','ASG301VUDS94',1749.99,2,2,3,4,1,1,2,2,2,16,14,13.4,1000,null,null,null,'','4050','https://www.bhphotovideo.com/c/product/1756853-REG/asus_gz301vu_ds94_13_4_rog_flow_gaming.html'),
    ('HP 17.3" OMEN 17-ck1003nr Gaming Laptop',null,'','HEOMEN12900H',1699.0,1,4,3,4,1,1,2,2,2,32,14,17.3,1000,null,null,null,'12900H','3080 Ti ','https://www.bhphotovideo.com/c/product/1758502-REG/hp_6u715ua_aba_17_3_omen_gaming_laptop.html'),
    ('Apple 16.2" MacBook Pro with M1 Max Chip',null,'','APMK1A3LLA',2699.0,1,1,1,7,5,6,3,3,1,32,10,16.2,1000,null,null,null,'','','https://www.bhphotovideo.com/c/product/1668190-REG/apple_mk1a3ll_a_16_2_macbook_pro_with.html'),
    ('Apple 14" MacBook Pro',null,'','APMBM2P51214',1749.0,2,1,1,5,2,7,3,4,1,16,10,14.2,512,null,null,null,'','','https://www.bhphotovideo.com/c/product/1746351-REG/apple_mphe3ll_a_14_macbook_pro_with.html'),
    ('ASUS 16" ProArt StudioBook 16 OLED Multi-Touch Laptop',null,'','ASH7604JVT',2199.99,1,2,1,4,1,1,2,5,2,32,24,16.0,1000,120,null,null,'','4060','https://www.bhphotovideo.com/c/product/1762489-REG/asus_h7604jv_ds96t_16_proart_studiobook_touch.html'),
    ('HP 16" ZBook Studio G9 Mobile Workstation',null,'','HEZBS166M748',3252.77,2,4,1,3,1,1,5,6,2,32,14,16.0,1000,120,null,null,'','3070','https://www.bhphotovideo.com/c/product/1712202-REG/hp_6m748ut_aba_zb_studio_16_g9_i7_12800h_32_1tb_3071ti_w11pd_16.html'),
    ('Acer 15.6" Aspire 3 Notebook',null,'','ACA3155933XY',399.99,2,6,1,1,2,4,2,1,3,8,null,15.6,256,null,null,null,'','','https://www.bhphotovideo.com/c/product/1722157-REG/acer_nx_k7waa_001_15_6_aspire_3_a315_59_33xy.html'),
    ('Acer 16" Nitro 16 Gaming Laptop (Obsidian Black)',null,'','ACAN1641R7FA',1349.0,3,6,3,3,1,1,2,2,2,16,8,16.0,512,165,null,null,'7735HS','4070','https://www.bhphotovideo.com/c/product/1750892-REG/acer_an16_41_r7fa_16_16_10_wqxga_165hz.html'),
    ('Lenovo 14" Slim 7 Multi-Touch Notebook (Misty Gray)',null,'','LE83A40004US',1199.99,1,5,1,3,5,2,5,7,2,16,null,14.0,512,null,null,null,'1360P','','https://www.bhphotovideo.com/c/product/1762583-REG/lenovo_83a40004us_14_slim_7_laptop.html'),
    ('ASUS ROG Strix G16 Gaming Laptop (2023, Eclipse Gray)',null,'','ASG614JUES94',1599.99,2,2,3,4,5,1,2,2,2,16,24,16.0,1000,null,null,null,'','4050','https://www.bhphotovideo.com/c/product/1756851-REG/asus_g614ju_es94_16_tuf_gaming_laptop.html'),
    ('Lenovo 16" IdeaPad Flex 5 2-in-1 Multi-Touch Notebook (Arctic Gray)',null,'','LE82Y1001VUS',899.0,1,5,1,3,5,2,2,1,2,16,null,16.0,512,null,null,null,'1355U ','','https://www.bhphotovideo.com/c/product/1762579-REG/lenovo_82y1001vus_16_ideapad_flex_5.html'),
    ('Lenovo 15.6" LOQ 15IRH8 Gaming Laptop (Onyx Gray)',null,'','LE82XV005GUS',1049.0,2,5,3,3,5,1,2,1,2,16,14,15.6,512,144,null,null,'','4050','https://www.bhphotovideo.com/c/product/1745673-REG/lenovo_82xv005gus_15_6_loq_15irh8_gaming.html'),
    ('Lenovo 15.6" ThinkPad E15 Gen 4 Notebook',null,'','LETP21E6007B',799.99,3,5,1,2,1,2,5,1,3,8,null,15.6,256,null,null,null,'','','https://www.bhphotovideo.com/c/product/1716083-REG/lenovo_21e6007bus_15_6_thinkpad_e15_gen.html'),
    ('HP 17" 470 G9 Laptop',null,'','HE6Z0W9UT',1199.99,2,4,1,3,2,1,5,1,3,16,10,17.3,512,null,null,null,'1265U','MX550','https://www.bhphotovideo.com/c/product/1718872-REG/hp_6z0w9ut_aba_17_3_470_g9_notebook.html'),
    ('Dell 15.6" Latitude 3520 Notebook (Gray)',null,'','DEL35207FK9C',629.0,2,3,1,2,5,2,6,1,3,8,4,15.6,256,null,null,null,'','','https://www.bhphotovideo.com/c/product/1723534-REG/dell_7fk9c_15_6_latitude_3520_laptop.html'),
    ('ASUS 15.6" 32GB C523 Chromebook',null,'','ASC523NADH02',269.99,1,2,1,9,2,8,7,8,3,4,null,15.6,32,null,null,null,'N3350','500','https://www.bhphotovideo.com/c/product/1437069-REG/asus_c523na_dh02_15_6_32gb_c523_chromebook.html'),
    ('Lenovo 16" ThinkPad P16 Gen 1 Mobile Workstation (Storm Gray)',null,'','LETPP1621D60',2899.0,2,5,1,3,5,1,5,2,2,32,null,16.0,1000,null,null,null,'','A4500','https://www.bhphotovideo.com/c/product/1713765-REG/lenovo_21d60073us_tpp16_g1_i7_12850hx_32_1tb.html'),
    ('HP 13.3" EliteBook 835 G8 Laptop',null,'','HE835G84X618',749.0,3,4,1,8,2,5,6,1,3,16,8,13.3,512,null,null,null,'','','https://www.bhphotovideo.com/c/product/1662469-REG/hp_4x618ut_aba_eb_835_g8_ryzen.html'),
    ('ASUS 15.6" Vivobook S 15 OLED Laptop (Midnight Black)',null,'','ASK5504VA',1099.99,1,2,1,4,1,2,2,7,2,16,14,15.6,1000,120,null,null,'','','https://www.bhphotovideo.com/c/product/1762490-REG/asus_k5504va_es96_15_6_vivobook_s_oled.html'),
    ('Apple 13.6" MacBook Air (M2, Midnight)',null,'','PMBAM2MN06',1799.0,1,1,1,10,1,9,3,2,1,16,8,13.6,1000,null,null,null,'','','https://www.bhphotovideo.com/c/product/1710332-REG/apple_mbam2mn_06_13_6_macbook_air_m2.html');


CREATE TRIGGER on_insert_year_update_lookup_values
    AFTER INSERT ON lkp_product_year
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_year) WHERE product_field = 'year_id';
CREATE TRIGGER on_update_year_update_lookup_values
    AFTER UPDATE ON lkp_product_year
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_year) WHERE  product_field = 'year_id';
CREATE TRIGGER on_delete_year_update_lookup_values
    AFTER DELETE ON lkp_product_year
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_year) WHERE  product_field = 'year_id';

CREATE TRIGGER on_insert_brand_update_lookup_values
    AFTER INSERT ON lkp_product_brand
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_brand) WHERE  product_field = 'brand_id';
CREATE TRIGGER on_update_brand_update_lookup_values
    AFTER UPDATE ON lkp_product_brand
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_brand) WHERE  product_field = 'brand_id';
CREATE TRIGGER on_delete_brand_update_lookup_values
    AFTER DELETE ON lkp_product_brand
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_brand) WHERE  product_field = 'brand_id';

CREATE TRIGGER on_insert_type_update_lookup_values
    AFTER INSERT ON lkp_product_type
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_type) WHERE  product_field = 'type_id';
CREATE TRIGGER on_update_type_update_lookup_values
    AFTER UPDATE ON lkp_product_type
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_type) WHERE  product_field = 'type_id';
CREATE TRIGGER on_delete_type_update_lookup_values
    AFTER DELETE ON lkp_product_type
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_type) WHERE  product_field = 'type_id';

CREATE TRIGGER on_insert_cpu_update_lookup_values
    AFTER INSERT ON lkp_product_cpu
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_cpu) WHERE  product_field = 'cpu_id';
CREATE TRIGGER on_update_cpu_update_lookup_values
    AFTER UPDATE ON lkp_product_cpu
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_cpu) WHERE  product_field = 'cpu_id';
CREATE TRIGGER on_delete_cpu_update_lookup_values
    AFTER DELETE ON lkp_product_cpu
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_cpu) WHERE  product_field = 'cpu_id';

CREATE TRIGGER on_insert_color_update_lookup_values
    AFTER INSERT ON lkp_product_color
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_color) WHERE  product_field = 'color_id';
CREATE TRIGGER on_update_color_update_lookup_values
    AFTER UPDATE ON lkp_product_color
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_color) WHERE  product_field = 'color_id';
CREATE TRIGGER on_delete_color_update_lookup_values
    AFTER DELETE ON lkp_product_color
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_color) WHERE  product_field = 'color_id';

CREATE TRIGGER on_insert_graphics_update_lookup_values
    AFTER INSERT ON lkp_product_graphics
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_graphics) WHERE  product_field = 'graphics_id';
CREATE TRIGGER on_update_graphics_update_lookup_values
    AFTER UPDATE ON lkp_product_graphics
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_graphics) WHERE  product_field = 'graphics_id';
CREATE TRIGGER on_delete_graphics_update_lookup_values
    AFTER DELETE ON lkp_product_graphics
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_graphics) WHERE  product_field = 'graphics_id';

CREATE TRIGGER on_insert_os_update_lookup_values
    AFTER INSERT ON lkp_product_os
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_os) WHERE  product_field = 'os_id';
CREATE TRIGGER on_update_os_update_lookup_values
    AFTER UPDATE ON lkp_product_os
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_os) WHERE  product_field = 'os_id';
CREATE TRIGGER on_delete_os_update_lookup_values
    AFTER DELETE ON lkp_product_os
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_os) WHERE  product_field = 'os_id';

CREATE TRIGGER on_insert_resolution_update_lookup_values
    AFTER INSERT ON lkp_product_resolution
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_resolution) WHERE  product_field = 'resolution_id';
CREATE TRIGGER on_update_resolution_update_lookup_values
    AFTER UPDATE ON lkp_product_resolution
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_resolution) WHERE  product_field = 'resolution_id';
CREATE TRIGGER on_delete_resolution_update_lookup_values
    AFTER DELETE ON lkp_product_resolution
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_resolution) WHERE  product_field = 'resolution_id';

CREATE TRIGGER on_insert_ram_type_update_lookup_values
    AFTER INSERT ON lkp_product_ram_type
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_ram_type) WHERE  product_field = 'ram_type_id';
CREATE TRIGGER on_update_ram_type_update_lookup_values
    AFTER UPDATE ON lkp_product_ram_type
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_ram_type) WHERE  product_field = 'ram_type_id';
CREATE TRIGGER on_delete_ram_type_update_lookup_values
    AFTER DELETE ON lkp_product_ram_type
    FOR EACH ROW
    UPDATE product_field SET lookup_table_values = (SELECT group_concat(value) FROM lkp_product_ram_type) WHERE  product_field = 'ram_type_id';

/*
DROP TRIGGER on_insert_year_update_lookup_values;
DROP TRIGGER on_update_year_update_lookup_values;
DROP TRIGGER on_delete_year_update_lookup_values;

DROP TRIGGER on_insert_type_update_lookup_values;
DROP TRIGGER on_update_type_update_lookup_values;
DROP TRIGGER on_delete_type_update_lookup_values;

DROP TRIGGER on_insert_brand_update_lookup_values;
DROP TRIGGER on_update_brand_update_lookup_values;
DROP TRIGGER on_delete_brand_update_lookup_values;

DROP TRIGGER on_insert_cpu_update_lookup_values;
DROP TRIGGER on_update_cpu_update_lookup_values;
DROP TRIGGER on_delete_cpu_update_lookup_values;

DROP TRIGGER on_insert_color_update_lookup_values;
DROP TRIGGER on_update_color_update_lookup_values;
DROP TRIGGER on_delete_color_update_lookup_values;

DROP TRIGGER on_insert_graphics_update_lookup_values;
DROP TRIGGER on_update_graphics_update_lookup_values;
DROP TRIGGER on_delete_graphics_update_lookup_values;

DROP TRIGGER on_insert_os_update_lookup_values;
DROP TRIGGER on_update_os_update_lookup_values;
DROP TRIGGER on_delete_os_update_lookup_values;

DROP TRIGGER on_insert_resolution_update_lookup_values;
DROP TRIGGER on_update_resolution_update_lookup_values;
DROP TRIGGER on_delete_resolution_update_lookup_values;

DROP TRIGGER on_insert_ram_type_update_lookup_values;
DROP TRIGGER on_update_ram_type_update_lookup_values;
DROP TRIGGER on_delete_ram_type_update_lookup_values;

drop table product_field;
drop table product;
drop table lkp_product_year;
drop table lkp_product_brand;
drop table lkp_product_type;
drop table lkp_product_cpu;
drop table lkp_product_color;
drop table lkp_product_graphics;
drop table lkp_product_os;
drop table lkp_product_resolution;
drop table lkp_product_ram_type;
*/