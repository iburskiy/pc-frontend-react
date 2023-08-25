const knex = require('./../db');
const { PRODUCT_TABLE } = require('../constants');

const PRODUCT_LOOKUP_FIELD_TEXT = 'Product Lookup Field';

module.exports = class ProductLookupController {
  constructor(lookupTable, columnInProduct) {
    this.lookupTable = lookupTable;
    this.columnInProduct = columnInProduct;
  }

  productLookupAll(req, res) {
    knex.select('*').from(this.lookupTable)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
  }

  /**
   * `id` for Lookup Field in `product` table (for example, `type_id`) is a FOREIGN KEY for `id` in lookupTable (`id` in `lkp_product_type`).
   * The goal of SQL query to select all rows from this.lookupTable with additional column `isProductExist`.
   * isProductExist` shows `1` if for a given lookupTable record exists at least one row with the same id in `products` table.
   * And `0` otherwise. For that we select only `min(id)` from `product` which is enough even if more products exist with such `id`.
   * @param req
   * @param res
   */
  productLookupAllExtended = (req, res) => {
    knex.raw(`SELECT pt.id, pt.value, CASE WHEN p.model is not NULL THEN 1 ELSE 0 END AS isProductExist 
                    FROM ${this.lookupTable} pt LEFT JOIN ${PRODUCT_TABLE} p 
                    ON pt.id = p.${this.columnInProduct} and p.id = (select min(id) from ${PRODUCT_TABLE} where ${this.columnInProduct} = pt.id);`)
    .then(data => {
      res.json(data);
    })
    .catch(err => console.log(err));
  }
  productLookupCreate = (req, res) => {
    knex(this.lookupTable)
    .insert({
      'value': req.body.value,
    })
    .then(() => {
      res.json({ success: true, message: `${PRODUCT_LOOKUP_FIELD_TEXT} "${req.body.value}" created!` })
    })
    .catch(err => {
      res.json({ success: false, message: `There was an error creating ${PRODUCT_LOOKUP_FIELD_TEXT} "${req.body.value}"` })
      console.error(`There was an error creating ${PRODUCT_LOOKUP_FIELD_TEXT} ${req.body.value}:`, '\n', `${err}`);
    })
  }

  productLookupUpdate = (req, res) => {
    const id = req.params.id;
    knex(this.lookupTable)
    .update({
      'value': req.body.value,
    })
    .where('id', id)
    .then(() => {
      res.json({ success: true, message: `${PRODUCT_LOOKUP_FIELD_TEXT} "${req.body.value}" updated!` })
    })
    .catch(err => {
      res.json({ success: false, message: `There was an error updating ${PRODUCT_LOOKUP_FIELD_TEXT} "${req.body.value}"` })
      console.error(`There was an error updating ${PRODUCT_LOOKUP_FIELD_TEXT} ${req.body.value}:`, '\n', `${err}`);
    })
  }

  productLookupDelete = (req, res) => {
    const id = req.params.id;
    knex(this.lookupTable)
    .where('id', id)
    .del()
    .then(() => {
      res.json({ success: true, message: `${PRODUCT_LOOKUP_FIELD_TEXT} with ID="${id}" deleted!` })
    })
    .catch(err => {
      res.json({ success: false, message: `There was an error deleting ${PRODUCT_LOOKUP_FIELD_TEXT} with ID="${id}"` })
      console.error(`There was an error deleting ${PRODUCT_LOOKUP_FIELD_TEXT} with ID=${id}:`, '\n', `${err}`);
    })
  }
}