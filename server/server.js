const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;
const productController = require('./controllers/product-controller');

const ProductLookupController = require('./controllers/product-lookup-controller');
// Product Lookup Field Controllers
const productYearController = new ProductLookupController('lkp_product_year', 'year_id');
const productBrandController = new ProductLookupController('lkp_product_brand', 'brand_id');
const productTypeController = new ProductLookupController('lkp_product_type', 'type_id');
const productCpuController = new ProductLookupController('lkp_product_cpu', 'cpu_id');
const productColorController = new ProductLookupController('lkp_product_color', 'color_id');
const productGraphicsController = new ProductLookupController('lkp_product_graphics', 'graphics_id');
const productOSController = new ProductLookupController('lkp_product_os', 'os_id');
const productResolutionController = new ProductLookupController('lkp_product_resolution', 'resolution_id');
const productRamTypeController = new ProductLookupController('lkp_product_ram_type', 'ram_type_id');

const productFieldController = require('./controllers/product-field-controller');

// required to avoid CORS policy error at localhost
app.use(cors());
// not possible to parse request body without `body-parser` package
// adds `200kb` limit to request - relevant when an image to product is added
app.use(bodyParser.json({ limit: '200kb' }));

app.get(['/product/all/:products_per_page'], (req, res) => {
  productController.productAll(req, res);
})
app.get(['/product/count'], (req, res) => {
  productController.productCount(req, res);
})
app.post('/product/create', (req, res) => {
  productController.productCreate(req, res);
})
app.get('/product/retrieve/:id', (req, res) => {
  productController.productRetrieve(req, res);
})
app.get('/product/retrieve/code/:code', (req, res) => {
  productController.productRetrieveByCode(req, res);
})
app.put('/product/update/:id', (req, res) => {
  productController.productUpdate(req, res);
});
app.delete('/product/delete/:id', (req, res) => {
  productController.productDelete(req, res);
});

generateProductLookupEndpoints(app, 'product-year', productYearController);
generateProductLookupEndpoints(app, 'product-brand', productBrandController);
generateProductLookupEndpoints(app, 'product-type', productTypeController);
generateProductLookupEndpoints(app, 'product-cpu', productCpuController);
generateProductLookupEndpoints(app, 'product-color', productColorController);
generateProductLookupEndpoints(app, 'product-graphics', productGraphicsController);
generateProductLookupEndpoints(app, 'product-os', productOSController);
generateProductLookupEndpoints(app, 'product-resolution', productResolutionController);
generateProductLookupEndpoints(app, 'product-ram-type', productRamTypeController);

app.get('/product-field/all', (req, res) => {
  productFieldController.fieldAll(req, res);
})
app.put('/product-field/update/:id', (req, res) => {
  productFieldController.fieldUpdate(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry but the url is invalid.')
})

function generateProductLookupEndpoints(app, entityUrlPath, controller) {
  app.get(`/${entityUrlPath}/all`, (req, res) => {
    controller.productLookupAll(req, res);
  })
  app.get(`/${entityUrlPath}/all/extended`, (req, res) => {
    controller.productLookupAllExtended(req, res);
  })
  app.post(`/${entityUrlPath}/create`, (req, res) => {
    controller.productLookupCreate(req, res);
  })
  app.put(`/${entityUrlPath}/update/:id`, (req, res) => {
    controller.productLookupUpdate(req, res);
  })
  app.delete(`/${entityUrlPath}/delete/:id`, (req, res) => {
    controller.productLookupDelete(req, res);
  })
}