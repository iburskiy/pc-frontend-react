import * as React from 'react';
import { PRODUCT_FIELD_INFO } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';

type InputFieldRowProps = {
  fieldName: string,
  value: string,
  setValueHandler: Dispatch<SetStateAction<string>>,
  isRequired: boolean,
}
export const InputFieldRow = (props: InputFieldRowProps) => {
  const fieldName = props.fieldName;
  const value = props.value;
  const setValue = props.setValueHandler;
  const isRequired = !!props.isRequired;

  const fieldInfo = PRODUCT_FIELD_INFO[fieldName];
  const unit = fieldInfo.unit;
  const asterix = isRequired ? '*' : '';
  const regexp = fieldInfo.validationRegexp;
  const warningMsg = fieldInfo.warningMsg;

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || regexp.test(value)) {
      setValue(value);
    }
  }

  return <div className="form__row">
            <label className="form__label" htmlFor={fieldName}>{fieldInfo.label}{asterix}:</label>
            <input id={fieldName} name={fieldName} type="text" className="form__field" value={value} onChange={(e) => onChangeField(e)} required={isRequired}/>
            { unit && <span className="form__unit">{fieldInfo.unit}</span> }
            { warningMsg && <FontAwesomeIcon icon="question-circle" className="question-icon" size="lg" title={warningMsg}/>}
          </div>
}