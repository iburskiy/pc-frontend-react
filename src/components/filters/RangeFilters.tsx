import * as React from 'react';
import { useContext } from 'react';
import { RootContext } from '../../index';
import { RangeFilter } from '../../types';
import { RangeFilterBlock } from './RangeFilterBlock';

export const RangeFilters = () => {
  const rootContext = useContext(RootContext);
  const rootStore = rootContext.rootStore;

  return <ul className="filters-range">
            {
              rootStore.rangeFilters.map( (filter: RangeFilter, index: number) => {
                return <RangeFilterBlock key={index} filter={filter} />;
              })
            }
          </ul>
};