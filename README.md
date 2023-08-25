- [Description](#description)
- [How to run the project](#how-to-run-the-project)
- [Webpack](#webpack)
- [Log in as admin](#log-in-as-admin)
- [SQLite](#SQLite)
- [Filters and Pagination](#filters-and-pagination)
- [Accessibility](#accessibility-a11y)

## Description
The goal of the project is to create Product Catalog, partially a catalog of computers with different characteristics.
It can be easily customized to other product types.
It has the list of products with pagination and list of filters, lets perform CRUD operations and configure the list of filters.
The project started from https://webpack.js.org/guides/typescript/
Webpack compiles typescript files into JS. Also, Express and SQLite are used for backend.
Log In functionality here is nominal - pressing `LOG IN` makes user an administrator with the possibility
to Add Products, Edit Fields (Lookups), Config Filters, Edit and Delete Products. (see `Login` section).

## How to run the project
### React app
`npm run build` is the way to build the project in `production` mode. All project files go to `dist` folder and it's enough to open `index.html` in browser.
`npm run start` command runs the project in `development` mode. In such a case the build gets into memory with webpack `devServer`, not in `dist` folder.

### Express server
`npm run server` starts `server.js` with `nodemon`. By default, it listens to changes in `.js` files and restarts the server on file changes.

## Webpack
`webpack.config.js` config is split to `production` and `development` configs. 
`npm run build` command takes `webpack.common.js` and merges it with `webpack.prod.js` with the help of 'webpack-merge' library.
See details in [How to run the project](#how-to-run-the-project) section.

`npm run start`  command takes `webpack.common.js` and merges it with `webpack.dev.js`.

## Log in as admin
There are actions and pages available only for logged-in user.

| Admin Action          | Url                                        |
|-----------------------|--------------------------------------------|
| Add Products          | http://localhost:8081/#/product/new        |
| Edit Fields (Lookups) | http://localhost:8081/#/product/fields     |                                                                                      |
| Config Filters        | http://localhost:8081/#/product/filters    |                                                                                   |
| Edit Products         | http://localhost:8081/#/product/edit/:id   |
| Delete Products       | no specific URL, button shows up for Admin | 

`isLoggedIn` parameter is one of the states used across the app.
Even though login process is nominal (user becomes logged-in by pressing `LOG IN` button),
you will not be able to do admin actions above and will be forwarded to `PageNotFound` page.
Urls and actions limitation is implemented on client side: if user presses `LOG IN` button, the state of `isLoggedIn` changes to `true`
and some Routes and blocks become available. Otherwise, user is forwarded on `PageNotFound` page with the directive:
```<Route path="*" component={PageNotFound} />```

## SQLite
`product-catalog.db` is primary Database file that must be used.
`product` is primary table for products, basically computers or laptops or monoblocks, etc.

### Images
Images for products are stored as `BLOB` in DB in `product` table, `image` field.
`image_name` is the field just for convenience. It shows on page http://localhost:8081/#/product/edit/1 that some image 
already stored for the product and image itself is displayed under it. But it doesn't have any functional profit. 
`image_name` can be any set of characters. 

There are only few static images such as logo, favicon and default product image. 
I used Copy Webpack Plugin (https://webpack.js.org/plugins/copy-webpack-plugin/). It copies images to `dist/` folder. 
To get correct full path for both `dev` and `prod` builds I used DefinePlugin and `process.env.PUBLIC_URL`.
To extract it in a component: <img src={`${process.env.PUBLIC_URL}static/images/logo.png`} className="header__logo" alt=""/> 

## Filters and Pagination
Filtering and pagination happens on server. At first when filters are filled in on the page, a URL is formed of the following view:
http://localhost:8081/#/?filters=price:500..1500,year:2023|2022,brand:Asus|Dell&q=book&page=1
There are 3 filter types: `search` (default that searches through `model` and `code` fields).
`range` where `from` and `to` values can be set such as `price`. And `list` with a set of values, such as `brand`.
`search` is passed to URL with `q` query parameter. `range` and `list` filters are passed in `filters` parameter.
Page number is passed as `page` query parameter.

`range` filters have the following format: `fieldName:${from}..${to}`, for example `price:500..1500`.
`list` filters have format: `fieldName:value1|value2|value3`, for example `year:2023|2022`. 
Field names are split with a comma: `filters=price:500..1500,year:2023|2022`.

The URL is listened by React components with the following approach: 
```
const history = useHistory();
useEffect(() => {
   ///some actions
   }, [history.location.search])
```
where `history.location.search` is search query - everything starting from `?`.

Then `backend API server` is called by React with a URL like: 
http://localhost:3000/product/all/5?filters=price:500..1500,year:2023|2022,brand:Asus|Dell&q=book
where `5` is number of products per page defined in React constants and passed to server, 
`page`, `filters` and `q` are parsed and transformed into a `where` clause and form an SQL statement. Here it's in a short form:
```
SELECT * FROM product 
WHERE price >= 500 AND price <= 1500 AND year in ('2023','2022') AND brand in ('Asus','Dell') AND (model LIKE '%book%' OR code LIKE '%book%')
LIMIT ${PRODUCTS_PER_PAGE} OFFSET ${PRODUCTS_PER_PAGE * pageNumber - PRODUCTS_PER_PAGE}
```
Last row with LIMIT and OFFSET restricts the results of the `select` to a minimum number of products shown for the given page.
For example if the constant is PRODUCTS_PER_PAGE = 5 and pageNumber = 3 then
LIMIT 5 OFFSET (5 * 3 - 5) which means that only products from 11 to 15 will be selected by the SQL statement and returned to web-server.

Also, there is a separate API endpoint to request general count of products for which filters are applied. 
For example, the number of products for the filters above is 17.
When we get such a result from backend, we display it in the section under Search Input. When we get it in the response, 
we update `productCount` variable in RootStore which is basically a global variable. `ProductList` listens to it with `useEffects` 
and forms Pagination component that needs `productCount` to display general number of pages.

### Product Lookup
Also, there are several `Product Lookup` tables which names start from `lkp_` prefix.
`Product Lookup` means `Product Type`, `Product CPU`, etc. Product Lookup table such as `lkp_product_type` stores 
`id` and `value` for each `Product Type` in the system. And `type_id` is FOREIGN KEY in `product` table for `id` from `lkp_product_type`.
For example, if laptop with id=10 in `product` is ultrabook and corresponding record for such `Product Type` in `lkp_product_type` 
has `id=6, value='ultrabook'`, then `type_id` in `product` will be 6.

### Product Filters
`product_field` contains the list of `product fields` eligible to make filtration on. 
`filtarable` shows if field should be filtered. 
`filter type` has `search`, `list` and `range` values. `search` is default type. `list` is a filter with lookup list of values,
for example, `color` can be `black`, `white`, `gold`. `range` is between one value and another, for example, `price` is between 600 and 800.
`lookup_table_values` field contains the list of values for `Product Lookup` fields. For example, values for `type_id` are 
`universal,business,home,gaming,workstation,ultrabook` which is the comma-separated values from corresponding `value` column of `lkp_product_type`.

By default, we put values to `loolup_table_values` on `INSERT INTO` statement with select such as
`(SELECT group_concat(value) FROM lkp_product_type)`. When admin inserts, updates or deletes any `Product Type` on `Edit Fields` page,
`trigger` DB construction automatically changes `loolup_table_values` with new list of values from `lkp_product_type`.
For example, we add new row with value=`superbook` to `lkp_product_type`. There is a trigger on `INSERT` for `lkp_product_type` table 
that updates `lookup_table_values` for `type_id` in `product_field` table:
Old value: `universal,business,home,gaming,workstation,ultrabook`
New value: `universal,business,home,gaming,workstation,ultrabook,superbook`
Similarly `lookup_table_values` for `type_id` row will be updated not only for `INSERT` but also for `UPDATE` and `DELETE` on `lkp_product_type` table.
The same trigger logic happens for all lookup tables, not only `lkp_product_type`. Unfortunately in SQLite it's not possible to create
common trigger for `INSERT`, `UPDATE`, `DELETE`. That's why we have to have the number of triggers equal to the number of Lookup Fields multiply to 3.
For example, if the number of `Lookup Fields` is 6, then the number of triggers will be 6x3 = 18.

## Accessibility (a11y)
The project corresponds to Accessibility Standards.
All active elements available via keyboard. Also, a hidden "Skip filters" link added to jump right to the Search Input.
It gets visible only when focused with Tab.
