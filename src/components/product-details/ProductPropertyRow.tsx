import * as React from 'react';
import { Product, ProductDAO } from '../../types';
import { PRODUCT_FIELD_INFO } from '../../constants';
import { Format } from '../widgets/Format';

type ProductPropertyRowProps = {
  fieldName: keyof ProductDAO,
  product: Product,
}

export const ProductPropertyRow = (props: ProductPropertyRowProps) => {
  const fieldName = props.fieldName;
  const fieldInfo = PRODUCT_FIELD_INFO[fieldName];
  const label = fieldInfo.label;
  const fieldAlias = fieldInfo.fieldAlias;
  const value = props.product[fieldAlias];

  return <div className="details__property property">
            <div className="property__left">
              {label}:
            </div>
            <div className="property__right">
              <Format fieldName={fieldName} value={value}/>
            </div>
          </div>
};