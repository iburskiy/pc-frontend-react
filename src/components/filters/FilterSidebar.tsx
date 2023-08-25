import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { ListFilters } from './ListFilters';
import { RangeFilters } from './RangeFilters';
import { RootContext } from '../../index';
import { useContext, useEffect } from 'react';
import ProductFieldApi from '../../api/ProductFieldApi';
import { FieldDAO } from '../../types';

export const FilterSidebar = () => {
  const rootContext = useContext(RootContext);
  const rootStore = rootContext.rootStore;

  useEffect(() => {
    retrieveFilters();
  }, []);

  const retrieveFilters = async () => {
    const fields: FieldDAO[] = await ProductFieldApi.fieldAll();
    ProductFieldApi.initFiltarableFields(fields);
    rootStore.initFilters();
    // update the state to re-render all components using it
    rootContext.setRootStore(rootStore);
  }

  return <aside className="sidebar">
            <div id="skip-filters">
              <HashLink to="#products" className="">Skip filters</HashLink>
            </div>
            <RangeFilters/>
            <ListFilters/>
          </aside>
};