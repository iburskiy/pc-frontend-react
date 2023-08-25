import { Field, FieldDAO, ResponseStatus } from '../types';
import { FilterTypeEnum } from '../enums';
import CommonApi from './CommonApi';
import { PRODUCT_FIELD_INFO } from '../constants';

const ENTITY_URL_PATH = 'product-field';

class ProductFieldApi {

  private _filterableFields: Field[] = [];

  get filterableFields(): Field[] {
    return this._filterableFields;
  }

  async fieldAll(): Promise<FieldDAO[]> {
    return await CommonApi.entityAll(ENTITY_URL_PATH) as Promise<FieldDAO[]>;
  }

  async fieldUpdate(id: string, body: string): Promise<ResponseStatus> {
    return await CommonApi.entityUpdate(id, body, ENTITY_URL_PATH);
  }

  initFiltarableFields(fieldDAOList: FieldDAO[]): void {
    this._filterableFields = [];

    fieldDAOList.forEach((item: FieldDAO) => {
      if (item.filterable) {
        const field: Field = {} as Field;
        field.id = item.id;
        field.name = PRODUCT_FIELD_INFO[item.product_field].fieldAlias;
        field.label = this.getLabelWithUnit(item.product_field);
        field.values = item.lookup_table_values ? item.lookup_table_values.split(',') : [];
        field.filterable = !!item.filterable;
        if (item.filter_type == null || Object.values(FilterTypeEnum).includes(item.filter_type)) {
          field.filterType = item.filter_type as FilterTypeEnum;
        } else {
          throw new Error(`Filter Type for "${item.product_field}" field is incorrect!`);
        }
        this.filterableFields.push(field);
      }
    })
  }

  getLabelWithUnit (productFieldName: string): string {
    const fieldInfo = PRODUCT_FIELD_INFO[productFieldName];
    return fieldInfo.unit ? `${fieldInfo.label} (${fieldInfo.unit})` : fieldInfo.label;
  }
}

export default new ProductFieldApi();