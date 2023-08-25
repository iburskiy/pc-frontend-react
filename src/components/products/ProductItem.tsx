import * as React from 'react';

type ProductProps = {
  children: React.ReactNode,
}

export const ProductItem = (props: ProductProps) => {
  return <li className="product">
           {props.children}
        </li>
}