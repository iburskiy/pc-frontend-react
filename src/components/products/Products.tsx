import * as React from "react";
import { ProductList } from './ProductList';
import { Search } from '../filters/Search';
import { ButtonPanel } from './ButtonPanel';
import {AdminPanel} from './AdminPanel';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReduxStore } from '../../types';

export const Products = () => {
  // forcing ProductList and ButtonPanel to reload when a product is deleted
  // via common state variable
  const [deletedProductId, setDeletedProductId] = useState(0);
  const isLoggedIn = useSelector((state: ReduxStore) => state.isLoggedIn);

  return <div id="products" className="products">
            { isLoggedIn &&
            <AdminPanel/>
            }
            <Search/>
            <ButtonPanel deletedProductId={deletedProductId}/>
            <ProductList setDeletedProductId={setDeletedProductId} deletedProductId={deletedProductId}/>
          </div>
};