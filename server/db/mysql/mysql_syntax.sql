ALTER TABLE mytable DROP FOREIGN KEY mytable_ibfk_1 ;

CREATE TABLE lkp_product_brand (
                                   id INT PRIMARY KEY AUTO_INCREMENT,
                                   value VARCHAR(255) NOT NULL
);

CREATE TABLE product2 (
                          id INT PRIMARY KEY,
                          brand_id INT,
                          FOREIGN KEY (brand_id) REFERENCES lkp_product_brand(id)
);



CREATE TABLE customer (
                          ID INT NOT NULL AUTO_INCREMENT,
                          Name varchar(50) NOT NULL,
                          City varchar(50) NOT NULL,
                          PRIMARY KEY (ID)
);

CREATE TABLE contact (
                         ID INT,
                         Customer_Id INT,
                         Customer_Info varchar(50) NOT NULL,
                         Type varchar(50) NOT NULL,
                         INDEX par_ind (Customer_Id),
  CONSTRAINT fk_customer FOREIGN KEY (Customer_Id)
  REFERENCES customer(ID)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);