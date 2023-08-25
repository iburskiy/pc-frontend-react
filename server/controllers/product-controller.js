const knex = require('./../db');
const PRODUCT_TABLE = require('./../constants').PRODUCT_TABLE;

const SELECT_PRODUCTS_STATEMENT = `select p.id, p.model, p.image, p.code, p.price, years.value AS year, brands.value AS brand, types.value AS type,
                                          CPUs.value AS cpu, colors.value AS color, graphicsCards.value AS graphicsCard, OStable.value AS os,
                                          resolutions.value AS resolution, ramTypes.value AS ramType, p.ram, p.core, p.diagonal, p.sizeHD,
                                          p.refresh_rate AS refreshRate, p.weight, p.thickness, p.cpu_model AS cpuModel, p.graphics_model AS graphicsModel, p.url
                                   from product AS p
                                    inner join lkp_product_year AS years on years.id = p.year_id
                                    inner join lkp_product_brand AS brands on brands.id = p.brand_id
                                    inner join lkp_product_type AS types on types.id = p.type_id
                                    inner join lkp_product_cpu AS CPUs on CPUs.id = p.cpu_id
                                    inner join lkp_product_color AS colors on colors.id = p.color_id
                                    inner join lkp_product_graphics AS graphicsCards on graphicsCards.id = p.graphics_id
                                    inner join lkp_product_os AS OStable on OStable.id = p.os_id
                                    inner join lkp_product_resolution AS resolutions on resolutions.id = p.resolution_id
                                    inner join lkp_product_ram_type AS ramTypes on ramTypes.id = p.ram_type_id`

// Get all products from database
exports.productAll = (req, res) => {
  const productsPerPage = req.params.products_per_page;
  const pageNumber = req.query.page ? req.query.page : 1;
  const filters = req.query.filters;
  const query = req.query.q;
  const whereClause = makeWhereClause(filters, query);
  //console.log('whereClause: ', whereClause);

  knex.raw(`${SELECT_PRODUCTS_STATEMENT}
            ${whereClause}
            LIMIT ${productsPerPage} OFFSET ${productsPerPage * pageNumber - productsPerPage}`
  )
  .then(data => {
    //console.log('data: ', data);
    res.json(data);
    //res.json(data[0]);
  })
  .catch(err => console.log(err));
  /*.finally(() => {
    knex.destroy();
  });*/
}

exports.productCount = (req, res) => {
  const filters = req.query.filters;
  const query = req.query.q;
  const whereClause = makeWhereClause(filters, query);

  knex.raw(`select count(*) as productCount from (
                    ${SELECT_PRODUCTS_STATEMENT}
                  ) sub
                  ${whereClause};`
  )
  .then(data => {
    res.json(data[0]);
    //res.json(data[0][0]);
  })
  .catch(err => console.log(err));
}

function makeWhereClause(filters, query) {
  function addAnd(whereClause, columnCondition) {
    if (!columnCondition) {
      return whereClause;
    }
    return whereClause ? `${whereClause} AND ${columnCondition}` : columnCondition;
  }

  let whereClause = '';
  const params = filters ? filters.split(',') : [];
  params.forEach((param) => {
    const paramExpr = param.split(':');
    const paramName = paramExpr[0];
    const paramValue = paramExpr[1];

    if (param.includes('..')) { // `range` filter
      const fromTo = paramValue.split('..');
      const from = fromTo[0];
      const to = fromTo[1];

      const valueFromExpr = from ? `${paramName} >= ${from}` : '';
      whereClause = addAnd(whereClause, valueFromExpr);

      const valueToExpr = to ? `${paramName} <= ${to}` : '';
      whereClause = addAnd(whereClause, valueToExpr);
    } else { //`list` filter
      const valuesArr = paramValue.split('|');
      const sqlArrayExpr = valuesArr.map((value) => `'${value}'`).join(',');
      whereClause = addAnd(whereClause, `${paramName} in (${sqlArrayExpr})`);
    }
  })
  if (query) { //add query if exists
    whereClause = addAnd(whereClause, `(model LIKE '%${query}%' OR code LIKE '%${query}%')`);
  }
  return whereClause ? `WHERE ${whereClause}` : '';
}

exports.productRetrieve = (req, res) => {
  const id = req.params.id;
  knex(PRODUCT_TABLE)
  .where('id', id)
  .first()
  .then(data => {
    res.json(data);
  })
  .catch(err => console.error(err));
}

exports.productRetrieveByCode = (req, res) => {
  const code = req.params.code;
  knex.select(
    'p.id',
    'p.model',
    'p.image',
    'p.code',
    'p.price',
    'years.value AS year',
    'brands.value AS brand',
    'types.value AS type',
    'CPUs.value AS cpu',
    'colors.value AS color',
    'graphicsCards.value AS graphicsCard',
    'OStable.value AS os',
    'resolutions.value AS resolution',
    'ramTypes.value AS ramType',
    'p.ram',
    'p.core',
    'p.diagonal',
    'p.sizeHD',
    'p.refresh_rate AS refreshRate',
    'p.weight',
    'p.thickness',
    'p.cpu_model AS cpuModel',
    'p.graphics_model AS graphicsModel',
    'p.url',
  )
  .from(`${PRODUCT_TABLE} AS p`)
  .innerJoin('lkp_product_year AS years', 'years.id', 'p.year_id')
  .innerJoin('lkp_product_brand AS brands', 'brands.id', 'p.brand_id')
  .innerJoin('lkp_product_type AS types', 'types.id', 'p.type_id')
  .innerJoin('lkp_product_cpu AS CPUs', 'CPUs.id', 'p.cpu_id')
  .innerJoin('lkp_product_color AS colors', 'colors.id', 'p.color_id')
  .innerJoin('lkp_product_graphics AS graphicsCards', 'graphicsCards.id', 'p.graphics_id')
  .innerJoin('lkp_product_os AS OStable', 'OStable.id', 'p.os_id')
  .innerJoin('lkp_product_resolution AS resolutions', 'resolutions.id', 'p.resolution_id')
  .innerJoin('lkp_product_ram_type AS ramTypes', 'ramTypes.id', 'p.ram_type_id')
  .where('code', code)
  .first()
  .then(data => {
    res.json(data);
  })
  .catch(err => console.error(err));
}

exports.productCreate = (req, res) => {
  knex(PRODUCT_TABLE)
  .insert({ // insert new record, a product
    'model': req.body.model,
    'image': req.body.image,
    'image_name': req.body.imageName,
    'code': req.body.code,
    'price': req.body.price,
    'year_id': req.body.yearId,
    'brand_id': req.body.brandId,
    'type_id': req.body.typeId,
    'cpu_id': req.body.cpuId,
    'color_id': req.body.colorId,
    'graphics_id': req.body.graphicsId,
    'os_id': req.body.osId,
    'resolution_id': req.body.resolutionId,
    'ram_type_id': req.body.ramTypeId,
    'ram': req.body.ram,
    'core': req.body.core,
    'diagonal': req.body.diagonal,
    'sizeHD': req.body.sizeHD,
    'refresh_rate': req.body.refreshRate,
    'weight': req.body.weight,
    'thickness': req.body.thickness,
    'cpu_model': req.body.cpuModel,
    'graphics_model': req.body.graphicsModel,
    'url': req.body.url,
  })
  .then(() => {
    // Send a success message in response
    res.json({ success: true, message: `Product model "${req.body.model}" created.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ success: false, message: `There was an error creating Product model "${req.body.model}"` })
    console.error(`There was an error creating Product model ${req.body.model}:`, '\n', `${err}`);
  })
}

exports.productUpdate = (req, res) => {
  const id = req.params.id;
  knex(PRODUCT_TABLE)
  .update({ // insert new record, a product
    'model': req.body.model,
    'image': req.body.image,
    'image_name': req.body.imageName,
    'code': req.body.code,
    'price': req.body.price,
    'year_id': req.body.yearId,
    'brand_id': req.body.brandId,
    'type_id': req.body.typeId,
    'cpu_id': req.body.cpuId,
    'color_id': req.body.colorId,
    'graphics_id': req.body.graphicsId,
    'os_id': req.body.osId,
    'resolution_id': req.body.resolutionId,
    'ram_type_id': req.body.ramTypeId,
    'ram': req.body.ram,
    'core': req.body.core,
    'diagonal': req.body.diagonal,
    'sizeHD': req.body.sizeHD,
    'refresh_rate': req.body.refreshRate,
    'weight': req.body.weight,
    'thickness': req.body.thickness,
    'cpu_model': req.body.cpuModel,
    'graphics_model': req.body.graphicsModel,
    'url': req.body.url,
  })
  .where('id', id)
  .then(() => {
    // Send a success message in response
    res.json({ success: true, message: `Product model "${req.body.model} updated!` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ success: false, message: `There was an error updating Product model "${req.body.model}"` })
    console.error(`There was an error updating product with ID=${id}:`, '\n', `${err}`);
  })
}

exports.productDelete = (req, res) => {
  const id = req.params.id;
  knex(PRODUCT_TABLE)
  .where('id', id)
  .del()
  .then(() => {
    // Send a success message in response
    res.json({ success: true, message: `Product with ID="${id}" deleted!`, id: id })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ success: false, message: `There was an error deleting Product with ID="${id}"` });
    console.error(`There was an error deleting product with ID=${id}:`, '\n', `${err}`);
  })
}