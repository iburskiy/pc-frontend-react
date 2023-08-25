import * as React from 'react';
import { ProductLookupExtended } from '../../types';
import { Button } from '../widgets/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { StatusAlertService } from 'react-status-alert';
import { ProductLookupApi } from '../../api/ProductLookupApi';

type ProductLookupRowProps = {
  productLookupExtended: ProductLookupExtended,
  onDeleteClick: (id: number) => Promise<void>,
  apiInstance: ProductLookupApi,
  lookupLabel: string,
}

export const ProductLookupRow = (props: ProductLookupRowProps) => {
  const productLookupExtended = props.productLookupExtended;
  const apiInstance = props.apiInstance;
  const warningMessage = "Can't be removed because a product already exists with such a " + props.lookupLabel;

  const inputRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [productLookupValue, setProductLookupValue] = useState(productLookupExtended.value);

  const enableInput = () => {
    setIsDisabled(false);
    setTimeout(() => {
      inputRef.current.focus();
    })
  }
  const updateProductLookup = async (e: React.FocusEvent<HTMLInputElement>) => {
    setIsDisabled(true);
    const idStr = String(productLookupExtended.id);
    const value = e.currentTarget.value;
    const body = JSON.stringify({
      'value': value,
    });
    const responseStatus = await apiInstance.productLookupUpdate(idStr, body);
    if (responseStatus.success) {
      StatusAlertService.showSuccess(responseStatus.message);
    } else {
      StatusAlertService.showError(responseStatus.message);
    }
  }
  const onDeleteClick = () => {
    props.onDeleteClick.call(null, productLookupExtended.id);
  }

  return <div className="product-lookup__item" key={productLookupExtended.id}>
            <input ref={inputRef} type="text" className="product-lookup__field" name="type" value={productLookupValue} disabled={isDisabled}
                   onBlur={(e) => updateProductLookup(e)} onChange={(e) => setProductLookupValue(e.currentTarget.value)}/>
            <Button handler={enableInput} preventDefault={true} className="button-square product-lookup__icon" label="" title="Edit value" iconNode={<FontAwesomeIcon icon="pen"/>}/>
            {productLookupExtended.isProductExist =='0' &&
              <Button handler={onDeleteClick} preventDefault={true} className="button-square product-lookup__icon" label="" title="Delete value" iconNode={<FontAwesomeIcon icon="minus" />}/>}
            {productLookupExtended.isProductExist =='1' &&
              <FontAwesomeIcon icon="question-circle" className="question-icon" size="lg" title={warningMessage}/>}
          </div>
}