import { FieldInfo } from './types';
import { FormatEnum } from './enums';

const SERVER_DOMAIN = 'http://localhost';
const SERVER_PORT = 5001;

const TWO_DECIMAL_REGEXP = /^(\d)*(\.)?(\d){0,2}$/;
const ONE_DECIMAL_REGEXP = /^(\d)+(\.)?(\d){0,1}$/;
export const ZERO_DECIMAL_REGEXP = /^(\d)+$/;
const ANY_CHARACTER_REGEXP = /^(.)*$/;
const LETTERS_DIGITS_REGEXP = /^[A-Za-z0-9\-_]*$/;
const URL_REGEXP = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/

export const SERVER_URL = `${SERVER_DOMAIN}:${SERVER_PORT}`;
export const PRODUCTS_PER_PAGE = 5;
export const PRODUCT_FIELD_INFO: {[index: string]: FieldInfo} = {
  'model': {
    label: "Model",
    fieldAlias: 'model',
    validationRegexp: ANY_CHARACTER_REGEXP,
    warningMsg: 'Model must be unique',
  },
  'image': {
    label: "Image",
    fieldAlias: 'image',
  },
  'code': {
    label: "Unique Product Code",
    fieldAlias: 'code',
    validationRegexp: LETTERS_DIGITS_REGEXP,
    warningMsg: `Code can have only characters, digits, "_" and "-" and must be unique`,
  },
  'price': {
    label: 'Price',
    fieldAlias: 'price',
    validationRegexp: TWO_DECIMAL_REGEXP,
    formatType: FormatEnum.CURRENCY,
  },
  'year_id': {
    label: 'Production Year',
    fieldAlias: 'year',
    lookupUrlPath: 'product-year',
  },
  'brand_id': {
    label: 'Brand',
    fieldAlias: 'brand',
    lookupUrlPath: 'product-brand',
  },
  'type_id': {
    label: 'Product Type',
    fieldAlias: 'type',
    lookupUrlPath: 'product-type',
  },
  'cpu_id': {
    label: 'CPU',
    fieldAlias: 'cpu',
    lookupUrlPath: 'product-cpu',
  },
  'color_id': {
    label: 'Color',
    fieldAlias: 'color',
    lookupUrlPath: 'product-color',
  },
  'graphics_id': {
    label: 'Graphics Card',
    fieldAlias: 'graphicsCard',
    lookupUrlPath: 'product-graphics',
  },
  'os_id': {
    label: 'Operating System',
    fieldAlias: 'os',
    lookupUrlPath: 'product-os',
  },
  'resolution_id': {
    label: 'Screen Resolution',
    fieldAlias: 'resolution',
    lookupUrlPath: 'product-resolution',
  },
  'ram_type_id': {
    label: 'RAM Type',
    fieldAlias: 'ramType',
    lookupUrlPath: 'product-ram-type',
  },
  'ram': {
    label: 'RAM',
    fieldAlias: 'ram',
    unit: 'GB',
    validationRegexp: ZERO_DECIMAL_REGEXP,
  },
  'core': {
    label: 'Total Number of Cores',
    fieldAlias: 'core',
    validationRegexp: ZERO_DECIMAL_REGEXP,
  },
  'diagonal': {
    label: 'Diagonal',
    fieldAlias: 'diagonal',
    unit: '\'\'',
    validationRegexp: ONE_DECIMAL_REGEXP,
  },
  'sizeHD': {
    label: 'Hard Drive Size',
    fieldAlias: 'sizeHD',
    unit: 'GB',
    validationRegexp: ZERO_DECIMAL_REGEXP,
    formatType: FormatEnum.STORAGE,
  },
  'refresh_rate': {
    label: 'Screen Refresh Rate',
    fieldAlias: 'refreshRate',
    unit: 'Hz',
    validationRegexp: ZERO_DECIMAL_REGEXP,
  },
  'weight': {
    label: 'Weight',
    fieldAlias: 'weight',
    unit: 'g',
    validationRegexp: ZERO_DECIMAL_REGEXP,
  },
  'thickness': {
    label: 'Thickness',
    fieldAlias: 'thickness',
    unit: 'mm',
    validationRegexp: ZERO_DECIMAL_REGEXP,
  },
  'cpu_model': {
    label: 'CPU Model',
    fieldAlias: 'cpuModel',
    validationRegexp: ANY_CHARACTER_REGEXP,
  },
  'graphics_model': {
    label: 'Graphics Card Model',
    fieldAlias: 'graphicsModel',
    validationRegexp: ANY_CHARACTER_REGEXP,
  },
  'url': {
    label: 'External URL',
    fieldAlias: 'url',
    validationRegexp: URL_REGEXP,
    warningMsg: "Copy paste URL to pass validation. Typing will fail because of Validation Regexp",
    formatType: FormatEnum.LINK,
  },
}