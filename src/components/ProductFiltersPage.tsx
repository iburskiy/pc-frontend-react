import * as React from "react";
import { useEffect, useState } from 'react';
import ProductFieldApi from '../api/ProductFieldApi';
import { FieldDAO } from '../types';
import { PRODUCT_FIELD_INFO } from '../constants';
import { StatusAlertService } from 'react-status-alert';
import { FilterTypeEnum } from '../enums';

export const ProductFiltersPage = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    retrieveFields();
  }, []);

  const retrieveFields = async () => {
    const fields = await ProductFieldApi.fieldAll();
    setFields(fields);
  }
  const onChangeChkbox = async (id: number, value: boolean) => {
    const responseStatus = await ProductFieldApi.fieldUpdate(String(id), JSON.stringify({
      'filterable': value ? 1 : 0,
    }))
    if (responseStatus.success) {
      StatusAlertService.showSuccess(responseStatus.message);
    } else {
      StatusAlertService.showError(responseStatus.message);
    }
  }

  return <>
            <table className="filters-page">
              <thead>
                <tr>
                  <th className="filters-page__item filters-page__item_nowrap">Field Name</th>
                  <th className="filters-page__item filters-page__item_nowrap">Field Label</th>
                  <th className="filters-page__item filters-page__item_nowrap">Lookup Table Values</th>
                  <th className="filters-page__item filters-page__item_nowrap">Filter Type</th>
                  <th className="filters-page__item filters-page__item_nowrap">Filterable</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((filter: FieldDAO) => (
                  <tr key={filter.id} className={ filter.filter_type == FilterTypeEnum.SEARCH ? 'filters-page_grayed' : ''}>
                    <td className="filters-page__item filters-page__item_nowrap">{filter.product_field}</td>
                    <td className="filters-page__item filters-page__item_nowrap">{PRODUCT_FIELD_INFO[filter.product_field].label}</td>
                    <td className="filters-page__item">{filter.lookup_table_values}</td>
                    <td className="filters-page__item">{filter.filter_type}</td>
                    <td className="filters-page__item filters-page__item_chkbox">
                      <input type="checkbox" className="filters-page__chkbox" disabled={filter.filter_type == FilterTypeEnum.SEARCH} defaultChecked={filter.filterable} onChange={(e) => onChangeChkbox(filter.id, e.currentTarget.checked)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p><sup>*</sup>Filters with Filter Type 'search` are default that's why are not editable</p>
        </>
};