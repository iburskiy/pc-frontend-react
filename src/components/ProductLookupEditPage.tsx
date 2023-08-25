import * as React from "react";
import { ProductLookup } from './product-lookup/ProductLookup';

export const ProductLookupEditPage = () => {
  return <div className="product-lookup-page">
            <ProductLookup lookupField="year_id"/>
            <ProductLookup lookupField="brand_id"/>
            <ProductLookup lookupField="type_id"/>
            <ProductLookup lookupField="cpu_id"/>
            <ProductLookup lookupField="color_id"/>
            <ProductLookup lookupField="graphics_id"/>
            <ProductLookup lookupField="os_id"/>
            <ProductLookup lookupField="resolution_id"/>
            <ProductLookup lookupField="ram_type_id"/>
          </div>
}