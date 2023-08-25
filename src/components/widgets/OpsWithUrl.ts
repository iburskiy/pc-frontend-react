import {History} from 'history';
export const getUrlParam = (history: History, paramName: string): string => {
  const params = new URLSearchParams(history.location.search);
  return params.get(paramName);
}

export const getPageFromUrl = (history: History): number => {
  const pageNumber = getUrlParam(history,'page');
  return parseInt(pageNumber ? pageNumber : '1', 10);
}

export const replaceFiltersInUrl = (history: History, fieldName: string, value: string) => {
  const params = new URLSearchParams(history.location.search);
  const filterValuesFromUrl = parseFiltersFromUrl(history);
  if (value) {
    filterValuesFromUrl[fieldName] = value;
  } else {
    delete filterValuesFromUrl[fieldName];
  }
  let filtersNew = '';
  for (const param in filterValuesFromUrl) {
    filtersNew = filtersNew + (filtersNew ? ',' : '') + `${param}:${filterValuesFromUrl[param]}`;
  }
  if (filtersNew) {
    params.set('filters', filtersNew);
  } else {
    params.delete('filters');
  }
  return params;
}

export const parseFiltersFromUrl = (history: History) => {
  const result: {[key: string]: string} = {};
  const filtersFromUrl: string = getUrlParam(history, 'filters');
  const params: string[] = filtersFromUrl ? filtersFromUrl.split(',') : [];
  params.forEach((param) => {
    const paramExpr = param.split(':');
    const paramName = paramExpr[0].toString();
    const paramValue = paramExpr[1];
    result[paramName] = paramValue;
  });
  return result;
}