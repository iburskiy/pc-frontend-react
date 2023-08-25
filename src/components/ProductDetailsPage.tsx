import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ProductPropertyRow } from './product-details/ProductPropertyRow';
import ProductApi from '../api/ProductApi';

type TParams = {
  code: string
};

export const ProductDetailsPage = ({match}: RouteComponentProps<TParams>) => {
  const code = match.params.code;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    retrieveProductByCode();
  }, []);

  const retrieveProductByCode = async () => {
    const product = await ProductApi.productRetrieveByCode(code);
    setProduct(product);
  }

  return <div className="details">
            { product &&
              <>
                <div className="details__left">
                  {product.image ? <img src={product.image} className="details__image" alt=""/>
                                 : <img src={`${process.env.PUBLIC_URL}static/images/no-image-available.jpeg`} className="details__image" alt=""/>
                  }
                </div>
                <div className="details__right">
                  <ProductPropertyRow fieldName="model" product={product} />
                  <ProductPropertyRow fieldName="price" product={product}/>
                  <ProductPropertyRow fieldName="year_id" product={product}/>
                  <ProductPropertyRow fieldName="brand_id" product={product}/>
                  <ProductPropertyRow fieldName="type_id" product={product}/>
                  <ProductPropertyRow fieldName="cpu_id" product={product}/>
                  <ProductPropertyRow fieldName="color_id" product={product}/>
                  <ProductPropertyRow fieldName="graphics_id" product={product}/>
                  <ProductPropertyRow fieldName="os_id" product={product}/>
                  <ProductPropertyRow fieldName="resolution_id" product={product}/>
                  <ProductPropertyRow fieldName="ram_type_id" product={product}/>
                  <ProductPropertyRow fieldName="ram" product={product}/>
                  <ProductPropertyRow fieldName="core" product={product}/>
                  <ProductPropertyRow fieldName="diagonal" product={product}/>
                  <ProductPropertyRow fieldName="sizeHD" product={product}/>
                  <ProductPropertyRow fieldName="refresh_rate" product={product}/>
                  <ProductPropertyRow fieldName="weight" product={product}/>
                  <ProductPropertyRow fieldName="thickness" product={product}/>
                  <ProductPropertyRow fieldName="cpu_model" product={product}/>
                  <ProductPropertyRow fieldName="graphics_model" product={product}/>
                  <ProductPropertyRow fieldName="url" product={product}/>
                </div>
              </>
            }
        </div>
};