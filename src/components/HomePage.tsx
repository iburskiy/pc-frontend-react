import * as React from "react";
import { FilterSidebar } from './filters/FilterSidebar';
import { Products } from './products/Products';

export const HomePage = () => {
  return <div className="homepage">
            <FilterSidebar/>
            <Products/>
          </div>
};