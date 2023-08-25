import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Product } from '../../types';
import { RootContext } from '../../index';
import ProductApi from '../../api/ProductApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PRODUCTS_PER_PAGE } from '../../constants';
import ReactPaginate from 'react-paginate';
import {
  getPageFromUrl,
} from '../widgets/OpsWithUrl';
import { ProductImage } from './ProductImage';
import { ProductInfo } from './ProductInfo';
import { ProductItem } from './ProductItem';

type ProductListProps = {
  setDeletedProductId: (id: number) => void,
  deletedProductId: number
}

export const ProductList = (props: ProductListProps) => {
  const rootContext = useContext(RootContext);
  const rootStore = rootContext.rootStore;

  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1); // max page number in pagination row
  // flag for loading spinner
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retrieveProducts();
  }, [history.location.search, props.deletedProductId]);

  useEffect(() => {
    updateReactPaginateState();
  }, [history.location.search, rootStore.productCount, props.deletedProductId]);

  const retrieveProducts = async () => {
    const path = history.location.search;
    setLoading(true);

    // to simulate noticeable loading of products:
    setTimeout(async () => {
      const currentProducts = await ProductApi.productAll(path);
      setProducts(currentProducts);
      setLoading(false);
    }, 200);
  }

  const updateReactPaginateState = () => {
    let pageNumberMax = Math.ceil( rootStore.productCount / PRODUCTS_PER_PAGE);
    pageNumberMax = pageNumberMax ? pageNumberMax : 1;
    setPageCount(pageNumberMax);

    const pageNumberFromUrl = getPageFromUrl(history);
    // otherwise it will be default
    if (pageNumberFromUrl <= pageNumberMax) {
      setCurrentPage(pageNumberFromUrl);
    }
  }

  /**
   * ReactPaginate component returns in `onPageChange` the object with `selected` field
   * that we need to change `currentPage` state.
   * @param selected
   */
  const paginate = ({ selected }: {selected: number}) => {
    const params = new URLSearchParams(history.location.search);
    params.set('page', String(selected + 1));
    history.push('?' + params.toString());
    scroll(0, 0);
  };

  return <div className={`products-container ${loading ? 'loading' : ''}`}>
          { loading && <FontAwesomeIcon className="spinner" icon={"spinner"} spin={true} size="6x" /> }

          <ul className="products">
            {
              products && products.map((product: Product, index: number) => {
                return <ProductItem key={index} >
                        <ProductImage productImage={product.image} />
                        <ProductInfo product={product} setDeletedProductId={props.setDeletedProductId} />
                      </ProductItem>
              })
            }
          </ul>
          {products.length > 0 &&
            <div className="pagination-container">
              <ReactPaginate
                onPageChange={paginate}
                pageCount={pageCount}
                previousLabel={'< prev'}
                nextLabel={'next >'}
                containerClassName={'pagination'}
                pageLinkClassName={'page-number'}
                previousLinkClassName={'page-number'}
                nextLinkClassName={'page-number'}
                activeLinkClassName={'active'}
                forcePage={currentPage - 1} // - 1 because `forcePage` works with index starting from 0
              />
            </div>
          }
        </div>
};