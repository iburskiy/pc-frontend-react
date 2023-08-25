import * as React from 'react';
import { PRODUCT_FIELD_INFO } from '../../constants';
import { ProductLookupApi } from '../../api/ProductLookupApi';
import { useEffect, useState } from 'react';
import { ProductLookup } from '../../types';

type LookupFieldRowProps = {
  fieldName: string,
  value: string,
  setValueHandler: (value: unknown) => void,
}

export const LookupFieldRow = (props: LookupFieldRowProps) => {
  const fieldName = props.fieldName;
  const value = props.value;
  const setValue = props.setValueHandler;

  const fieldInfo = PRODUCT_FIELD_INFO[fieldName];
  const lookupPath = fieldInfo.lookupUrlPath;
  const fieldApi = new ProductLookupApi(lookupPath);

  const [lookupValues, setLookupValues] = useState(undefined);

  useEffect(() => {
    retrieveLookupValues();
  }, []);

  const retrieveLookupValues = async () => {
    const values = await fieldApi.productLookupAll();
    setLookupValues(values);
  }

  const onChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const valueInt = value ? parseInt(value, 10) : undefined;
    setValue(valueInt);
  }

  return <div className="form__row">
            <label className="form__label" htmlFor={fieldName}>{fieldInfo.label}*:</label>
            <select id={fieldName} name={fieldName} className="form__field" value={value} onChange={onChangeField} required>
              <option key="0" value="">Choose an option</option>
              {lookupValues && lookupValues.map((lookupValue: ProductLookup) => (<option key={lookupValue.id} value={lookupValue.id}>{lookupValue.value}</option>))}
            </select>
          </div>
}