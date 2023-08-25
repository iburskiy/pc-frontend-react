import * as React from "react";
import { ListFilter } from '../../types';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { parseFiltersFromUrl, replaceFiltersInUrl } from '../widgets/OpsWithUrl';

type ListFilterBlockProps = {
  filter: ListFilter;
};

export const ListFilterBlock = (props: ListFilterBlockProps) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const history = useHistory();
  const filter = props.filter;

  useEffect(() => {
    const filterObject = parseFiltersFromUrl(history);
    const filterValuesStr = filterObject[props.filter.field];
    const filterValuesArr = filterValuesStr ? filterValuesStr.split('|') : [];
    setSelectedValues(filterValuesArr);
  }, [history.location.search]);

  const applyFilterChange = (e: React.ChangeEvent<HTMLInputElement>, value: string): void => {
    let selectedValuesArr;
    if (e.target.checked) {
      selectedValuesArr = [...selectedValues, value];
    } else {
      selectedValuesArr = selectedValues.filter(item => item !== value);
    }
    setSelectedValues(selectedValuesArr);
    const params = replaceFiltersInUrl(history, filter.field, selectedValuesArr.join('|'));
    params.delete('page');
    history.push('?' + params.toString());
  };

  return <li className="filter">
            <div className="filter__name">{filter.label}:</div>
            <ul className="filter__list list-filter">
              {
                filter.values.map((value: string, i: number) => {
                  return <li key={i}>
                            <label className="list-filter__label" htmlFor={filter.field + '-' + value}>
                              <input type="checkbox" className="list-filter__checkbox" id={filter.field + '-' + value} name={filter.field + '-' + value} value={value}
                                     checked={selectedValues.includes(value)} onChange={(e) => applyFilterChange(e, value)}/>
                              {value}
                            </label>
                          </li>
                })
              }
            </ul>
          </li>
};