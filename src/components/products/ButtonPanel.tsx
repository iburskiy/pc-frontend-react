import * as React from "react";
import { useContext, useEffect, useState } from 'react';
import { RootContext } from '../../index';
import { Button } from '../widgets/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductApi from '../../api/ProductApi';
import { useHistory } from 'react-router-dom';

type ButtonPanelProps = {
  deletedProductId: number
}

export const ButtonPanel = (props: ButtonPanelProps) => {
  const rootContext = useContext(RootContext);
  const rootStore = rootContext.rootStore;
  const [productCount, setProductCount] = useState(0);

  const history = useHistory();

  useEffect(() => {
    retrieveProductCount();
  }, [history.location.search, props.deletedProductId]);

  const retrieveProductCount = async () => {
    const path = history.location.search;
    const data = await ProductApi.productCount(path);
    setProductCount(data.productCount);
    // the line below updates ProductList.updateReactPaginateState that shouldn't happen in general
    // that's why `setRootStore` is added below
    rootStore.productCount = data.productCount;
    rootContext.setRootStore(rootStore)
  }

  const clearAll = () => {
    history.push('/');
  }

  return <div className="button-panel">
            <Button path='/' preventDefault={false} handler={clearAll} className="button" label="Clear All" iconNode={<FontAwesomeIcon icon="filter" />}/>
            <div className="button-panel__message">
              The number of search results: {productCount}
            </div>
          </div>
};