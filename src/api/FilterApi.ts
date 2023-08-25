import ProductFieldApi from './ProductFieldApi';
import { Field, Filter, ListFilter, RangeFilter } from '../types';
import { FilterTypeEnum } from '../enums';

class FilterApi {

  getListFilters(): ListFilter[] {
    const listFilters: ListFilter[] = [];

    ProductFieldApi.filterableFields.forEach( (field: Field) => {
      const filter: ListFilter = <ListFilter>this.getFilterWithCoreFieldsFrom(field);
      if (filter.type === FilterTypeEnum.LIST) {
        filter.values = field.values;
        listFilters.push(filter);
      }
    });

    return listFilters;
  }

  getRangeFilters(): RangeFilter[] {
    const rangeFilters: RangeFilter[] = [];

    ProductFieldApi.filterableFields.forEach( (field: Field) => {
      const filter: RangeFilter = <RangeFilter>this.getFilterWithCoreFieldsFrom(field);
      if (filter.type === FilterTypeEnum.RANGE) {
        rangeFilters.push(filter);
      }
    });

    return rangeFilters;
  }

  private getFilterWithCoreFieldsFrom(field: Field): Filter {
    return {
      field: field.name,
      type: field.filterType,
      label: field.label,
    };
  }
}

export default new FilterApi();