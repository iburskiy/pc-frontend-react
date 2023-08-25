import * as React from 'react';
import { Product, ReduxStore } from '../../types';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../widgets/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Format } from '../widgets/Format';
import { PRODUCT_FIELD_INFO } from '../../constants';
import ProductApi from '../../api/ProductApi';
import { StatusAlertService } from 'react-status-alert';
import { useSelector } from 'react-redux';

type ProductInfoProps = {
  product: Product,
  setDeletedProductId: (id: number) => void,
}

export const ProductInfo = (props: ProductInfoProps) => {
  const product = props.product;
  const history = useHistory();
  const isLoggedIn = useSelector((state: ReduxStore) => state.isLoggedIn);

  const deleteProduct = async (id: number) => {
    const response = confirm("Delete the product?");
    if (response) {
      const responseStatus = await ProductApi.productDelete(String(id));
      if (responseStatus.success) {
        StatusAlertService.showSuccess(responseStatus.message);

        const params = new URLSearchParams(history.location.search);
        params.delete('page');
        history.push('?' + params.toString());
        // sets `deletedProductId` state in common parent component Products
        // for ProductList and ButtonPanel. Since both componenets have this stateful variable
        // in `useEffects`, once a product is deleted, it triggers `retrieveProducts` and `retrieveProductCount`
        // and refresh data both components.
        props.setDeletedProductId(responseStatus.id);
      } else {
        StatusAlertService.showError(responseStatus.message);
      }
    }
  }

  return <div className="product__right">
          <div className="product__top">
            <div className="product__model">
              <Link to={`/product/details/${product.code}`}>{product.model}</Link>
              {product.color ? ` (${product.color})` : ''}
            </div>
            { isLoggedIn &&
              <div className="product__admin-buttons">
                <Button path={'/product/edit/' + product.id} preventDefault={false} className="button-small product__edit" label="" title="Edit product" iconNode={<FontAwesomeIcon icon="pen" size="sm"/>}/>
                <Button handler={() => deleteProduct(product.id)} preventDefault={true} className="button-small product__delete" label="" title="Delete product" iconNode={<FontAwesomeIcon icon="window-close" size="sm"/>}/>
              </div>
            }
          </div>
          <ul className="product__description">
            <li className="product__description-item">
              {product.cpu} {product.cpuModel}
              <Format fieldName="core" value={product.core} startWithSlash={true} endWithText="-Core"/>
            </li>
            <li className="product__description-item">
              {product.graphicsCard} {product.graphicsModel}
              <Format fieldName="diagonal" value={product.diagonal} startWithSlash={true}/>
              <Format fieldName="resolution_id" value={product.resolution} startWithSlash={true}/>
              <Format fieldName='refresh_rate' value={product.refreshRate} startWithSlash={true}/>
            </li>
            <li className="product__description-item">
              <Format fieldName="ram" value={product.ram} endWithText=" "/>
              <Format fieldName="ram_type_id" value={product.ramType} endWithText=" RAM"/>
              <Format fieldName="sizeHD" value={product.sizeHD} startWithSlash={true} endWithText=" SSD"/>
            </li>
            <li className="product__description-item">
              {product.os}
            </li>
          </ul>
          <div className="product__price">
            {PRODUCT_FIELD_INFO.price.label}: <Format fieldName="price" value={product.price}/>
          </div>
        </div>
}