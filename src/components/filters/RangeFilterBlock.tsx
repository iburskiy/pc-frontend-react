import { RangeFilter } from '../../types';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { parseFiltersFromUrl, replaceFiltersInUrl } from '../widgets/OpsWithUrl';
import {ZERO_DECIMAL_REGEXP} from '../../constants';

type RangeFilterBlockProps = {
  filter: RangeFilter;
};

export const RangeFilterBlock = (props: RangeFilterBlockProps) => {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const history = useHistory();

  useEffect(() => {
    const filterObject = parseFiltersFromUrl(history);
    const filterValues = filterObject[props.filter.field];
    let min = '', max = '';
    if (filterValues) {
      [min, max] = filterValues.split('..');
    }
    setMinValue(min);
    setMaxValue(max);
  }, [history.location.search])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || ZERO_DECIMAL_REGEXP.test(value)) {
      setMinValue(value)
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === '' || ZERO_DECIMAL_REGEXP.test(value)) {
      setMaxValue(value);
    }
  };

  const applyFilterChange = (): void => {
    const valueToUrl = minValue || maxValue ? `${minValue}..${maxValue}` : '';
    const params = replaceFiltersInUrl(history, props.filter.field, valueToUrl);
    params.delete('page');
    history.push('?' + params.toString());
  };

  const clearRangeFilter = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    e.preventDefault();
    setMinValue('');
    setMaxValue('');

    const params = replaceFiltersInUrl(history, props.filter.field, '');
    params.delete('page');
    history.push('?' + params.toString());
  };

  return <li className="filter">
            <div className="filter__name">{props.filter.label}:</div>
            <div className="filter__range range">
              <input type="text" className="range__min" value={minValue} onChange={handleMinChange} placeholder="min."/>
              <span className="range__from">to</span>
              <input type="text" className="range__max" value={maxValue} onChange={handleMaxChange} placeholder="max."/>
              <span className="range__icon" tabIndex={0} onClick={applyFilterChange} onKeyPress={applyFilterChange}>
                <FontAwesomeIcon icon={"arrow-right"}/>
              </span>
              <div>
                <a href="#" className="range__clear" tabIndex={0} onClick={(e) => clearRangeFilter(e)} onKeyPress={(e) => clearRangeFilter(e)}>Clear min. and max.</a>
              </div>
            </div>
          </li>
};
