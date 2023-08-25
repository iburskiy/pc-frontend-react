import { FilterTypeEnum, FormatEnum } from './enums';

export interface Field {
  id: number;
  name: string;
  label: string;
  values: string[];
  filterType: FilterTypeEnum;
  filterable: boolean;
}

export interface FieldDAO {
  id: number;
  product_field: string;
  lookup_table_values: string;
  filter_type: FilterTypeEnum;
  filterable: boolean;
}

export interface FieldInfo {
  label: string,
  fieldAlias: keyof Product,
  lookupUrlPath?: string,
  unit?: string,
  validationRegexp? : any,
  warningMsg? : string,
  formatType? : FormatEnum,
}

export interface Filter {
  label: string;
  field: string;
  type: FilterTypeEnum;
}

export interface RangeFilter extends Filter {
  type: FilterTypeEnum.RANGE;
}

export interface ListFilter extends Filter {
  type: FilterTypeEnum.LIST;
  values: string[];
}

/* Not needed anymore
export interface SearchFilter {
  type: FilterTypeEnum.SEARCH;
}*/

export interface ResponseStatus {
  success: boolean;
  message: string;
}

export interface ResponseStatusDelete extends ResponseStatus{
  id: number;
}

export interface Product {
  //[index: string]: any, - possible way to remove //@ts-ignore
  id: number,
  model: string;
  image: string;
  code: string;
  price: number;
  year: string;
  brand: string;
  type: string;
  cpu: string;
  color: string;
  graphicsCard: string;
  os: string;
  resolution: string;
  ramType: string;
  ram: number;
  core: number;
  diagonal: number;
  sizeHD: number;
  refreshRate: number;
  weight: number;
  thickness: number;
  cpuModel: string;
  graphicsModel: string;
  url: string;
}

export interface ProductDAO {
  id: number;
  model: string;
  image: string;
  image_name: string;
  code: string;
  price: number;
  year_id: number;
  brand_id: number;
  type_id: number;
  cpu_id: number;
  color_id: number;
  graphics_id: number;
  os_id: number;
  resolution_id: number;
  ram_type_id: number;
  ram: number;
  core: number;
  diagonal: number;
  sizeHD: number;
  refresh_rate: number;
  weight: number;
  thickness: number;
  cpu_model: string;
  graphics_model: string;
  url: string;
}

export interface ProductLookup {
  id: number;
  value: string;
}

/**
 * Contains Product Lookup `id` and `value` (such as Product Type, Product Cpu etc.),
 * and `isProductExist` shows if there are `products` with such a Product Lookup id in `products` table.
 */
export interface ProductLookupExtended {
  id: number;
  value: string;
  isProductExist: string;
}

export interface ReduxStore {
  isLoggedIn: boolean,
}