import * as React from 'react';

type ProductImageProps = {
  productImage: string,
}

export const ProductImage = (props: ProductImageProps) => {
  return <div className="product__left">
          {props.productImage ? <img src={props.productImage} className="product__image" alt=""/>
            : <img src={`${process.env.PUBLIC_URL}static/images/no-image-available.jpeg`} className="product__image" alt=""/>
          }
        </div>
}