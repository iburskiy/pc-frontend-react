import * as React from 'react';
import { Button } from '../widgets/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductLookupExtended } from '../../types';
import { ProductLookupRow } from './ProductLookupRow';
import { StatusAlertService } from 'react-status-alert';
import { useEffect, useRef, useState } from 'react';
import {ProductLookupApi} from '../../api/ProductLookupApi';
import {PRODUCT_FIELD_INFO} from '../../constants';

type ProductLookupProps = {
  lookupField: string,
}

export const ProductLookup = (props: ProductLookupProps) => {
  const fieldInfo = PRODUCT_FIELD_INFO[props.lookupField];
  const lookupUrlPath = fieldInfo.lookupUrlPath;
  const lookupLabel = fieldInfo.label;

  const [productLookupsExtended, setProductLookupsExtended] = useState(null);
  const addInputRef = useRef(null);
  const productLookupApi = new ProductLookupApi(lookupUrlPath);

  useEffect(() => {
    retrieveProductLookups();
  }, []);

  const retrieveProductLookups = async () => {
    const productLookupExtendeds: ProductLookupExtended[] = await productLookupApi.productLookupAllExtended();
    setProductLookupsExtended(productLookupExtendeds);
  }

  const addProductLookup = async () => {
    const value = addInputRef.current.value;
    if (value) {
      const body = JSON.stringify({
        'value': value,
      });
      const responseStatus = await productLookupApi.productLookupCreate(body);
      if (responseStatus.success) {
        StatusAlertService.showSuccess(responseStatus.message);
        retrieveProductLookups();
        addInputRef.current.value = '';
      } else {
        StatusAlertService.showError(responseStatus.message);
      }
    }
  }
  const deleteProductLookup = async (id: number): Promise<void> => {
    const idStr = String(id);
    const responseStatus = await productLookupApi.productLookupDelete(idStr);
    if (responseStatus.success) {
      StatusAlertService.showSuccess(responseStatus.message);
      const productLookupsUpdated = productLookupsExtended.filter((item: ProductLookupExtended) => item.id !== id)
      setProductLookupsExtended(productLookupsUpdated);
    } else {
      StatusAlertService.showError(responseStatus.message);
    }
  }

  return <div className="product-lookup">
            <div className="product-lookup__title">{lookupLabel} values:</div>
            <div className="product-lookup__content">
              <div className="product-lookup__new">
                <input ref={addInputRef} type="text" className="product-lookup__field" />
                <Button handler={addProductLookup} preventDefault={true} className="button-square product-lookup__icon" label="" title="Add value" iconNode={<FontAwesomeIcon icon="plus" />}/>
              </div>
              <div className="product-lookup__old">
                {productLookupsExtended &&
                  productLookupsExtended.map((lookupExtended: ProductLookupExtended) => (
                    <ProductLookupRow productLookupExtended={lookupExtended}
                                      key={lookupExtended.id}
                                      onDeleteClick={deleteProductLookup}
                                      apiInstance={productLookupApi}
                                      lookupLabel={lookupLabel}/>
                  ))}
              </div>
            </div>
          </div>
}