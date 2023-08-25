import * as React from 'react';
import { useContext } from 'react';
import { RootContext } from '../../index';
import { ListFilter } from '../../types';
import { ListFilterBlock } from './ListFilterBlock';

export const ListFilters = () => {
  const rootContext = useContext(RootContext);
  const rootStore = rootContext.rootStore;

  return <ul className="filters-list">
            {
              rootStore.listFilters.map( (filter: ListFilter, index: number) => {
                return <ListFilterBlock key={index} filter={filter}/>;
              })
            }
          </ul>
}