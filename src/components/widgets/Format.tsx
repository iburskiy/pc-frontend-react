import * as React from 'react';
import { FormatEnum } from '../../enums';
import { ProductDAO } from '../../types';
import { PRODUCT_FIELD_INFO } from '../../constants';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

type FormatProps = {
  fieldName: keyof ProductDAO,
  value: string | number,
  startWithSlash?: boolean,
  endWithText?: string,
}

/**
 * Make formatting for value.
 * if field has `formatType` Currency, then Format turns `1069.99` into `$1,069.99`
 * if field has `formatType` Link, then Format turns value into a link with href="value"
 * if field has no `formatType` and `startWithSlash` with `endWithText` are not passed to Format, then Format returns value as is.
 * if field has `unit`, then it returns value + unit. For example, if value=512 and unit='GB', then the result is `512GB`
 * if value=512, startWithSlash={true}, then Format returns ` / 512GB`. Slash helps where we need to output many values one by one.
 * if value=512, unit='GB' endWithText=" SSD", then Format returns `512GB SSD`.
 * @param props
 * @constructor
 */
export const Format = (props: FormatProps) => {
  const fieldInfo = PRODUCT_FIELD_INFO[props.fieldName];
  // component returns either string or <a href={value}></a> which is React.ReactElement
  // if props.value is of `number` type, then it's cast to `string`
  let value: string | React.ReactElement = (typeof props.value == 'number') ? String(props.value) : props.value;

  const hasSlash = props.startWithSlash;
  const text = props.endWithText;
  const formatType = fieldInfo.formatType;
  let unit = fieldInfo.unit;

  if (!value) {
    // we need to return `null` to display empty space as it's a JSX component
    return null;
  }

  const formatValue = (value: string) => {
    value = addUnit(value);
    value = addSlash(value);
    value = addText(value);
    return value;
  }
  const addUnit = (value: string) => {
    return unit ? `${value}${unit}` : value;
  }
  const addSlash = (value: string) => {
    return hasSlash ? ` / ${value}` : value;
  }
  const addText = (value: string) => {
    return text ? `${value}${text}` : value;
  }

  let valueNumber: number;
  switch (formatType) {
    case FormatEnum.CURRENCY:
      valueNumber = Number(value);
      value = formatter.format(valueNumber);
      break;
    case FormatEnum.LINK:
      value = value ? <a href={value} target="_blank">External Link</a> : '';
      break;
    case FormatEnum.STORAGE:
      valueNumber = Number(value);
      if (valueNumber >= 1000) {
        valueNumber = Math.floor(valueNumber/1000);
        unit = 'TB'; // terabytes
      }
      value = String(valueNumber);
      value = formatValue(value);
      break;
    default:
      value = formatValue(value);
  }

  if (typeof value == 'string') {
    return <>{value}</>
  }
  return value;
}