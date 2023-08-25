const knex = require('../db');

const PRODUCT_FIELD_TABLE = 'product_field';

exports.fieldAll = (req, res) => {
  knex.select('*').from(PRODUCT_FIELD_TABLE)
  .then(data => {
    res.json(data);
  })
  .catch(err => console.log(err));
}

exports.fieldUpdate = (req, res) => {
  const id = req.params.id;
  knex(PRODUCT_FIELD_TABLE)
  .update({
    'filterable': req.body.filterable,
  })
  .where('id', id)
  .then(() => {
    res.json({ success: true, message: `Field updated!` })
  })
  .catch(err => {
    res.json({ success: false, message: `There was an error updating Field with ID=${id}` })
    console.error(`There was an error updating Field with ID=${id}`, '\n', `${err}`);
  })
}
