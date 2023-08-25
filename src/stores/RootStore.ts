import { ListFilter, RangeFilter } from '../types';
import FilterApi from '../api/FilterApi';

class RootStore {
  // shows if user is authenticated
  private _isLoggedIn: boolean = false;
  // max number of products for all set filters, also needed for max page in Pagination
  private _productCount: number = 0;
  // Set of `list` Filters with label and checkbox labels, created from Fields that user marked as filterable (active)
  private _listFilters: ListFilter[] = [];
  // Set of `range` Filters with label, created from Fields that user marked as filterable (active)
  private _rangeFilters: RangeFilter[] = [];

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  set isLoggedIn(isLoggedIn: boolean) {
    this._isLoggedIn = isLoggedIn;
  }

  get productCount(): number {
    return this._productCount;
  }
  set productCount(productCount: number) {
    this._productCount = productCount;
  }

  get listFilters(): ListFilter[] {
    return this._listFilters;
  }

  get rangeFilters(): RangeFilter[] {
    return this._rangeFilters;
  }

  initFilters() {
    this._listFilters = FilterApi.getListFilters();
    this._rangeFilters = FilterApi.getRangeFilters();
  }
}

export default new RootStore();