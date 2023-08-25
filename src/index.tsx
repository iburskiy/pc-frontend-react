import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import "./css/style.scss";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import {HomePage} from './components/HomePage';
import {ProductDetailsPage } from './components/ProductDetailsPage';
import RootStore from './stores/RootStore';
import { Header } from './components/Header';
import {ProductEditPage} from './components/ProductEditPage';
import {ProductLookupEditPage} from './components/ProductLookupEditPage';
import StatusAlert from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
import { ProductFiltersPage } from './components/ProductFiltersPage';
import { PageNotFound } from './components/PageNotFound';
import { Provider, useSelector } from 'react-redux';
import {store} from './stores/ReduxStore';
import { ReduxStore } from './types';

library.add(fas, far); //add all icon packages that later can be referenced by icon name

type RootStoreType = typeof RootStore;

/**
 * Create context. It has `rootStore`, the main state of the app, and `setRootStore` is a handle to change it.
 * It contains just defaults. Primary values will be set in `RootContext.Provider` via `this.state`
 */
export const RootContext = React.createContext({
  rootStore: {} as RootStoreType,
  // eslint-disable-next-line
  setRootStore: (value: RootStoreType): void => {},
});

// just a signature of State
type AppState = {
  rootStore: RootStoreType,
  setRootStore: (newRootStore: RootStoreType) => void
};

const SwitchRoutes = () => {
  const isLoggedIn = useSelector((state: ReduxStore) => state.isLoggedIn);
  return <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/product/details/:code" component={ProductDetailsPage} />
          // putting Routes to an array was just the solution found in https://stackoverflow.com/a/68637108
          {isLoggedIn && [
            <Route exact path="/product/new" key="/product/new" component={ProductEditPage} />,
            <Route exact path="/product/edit/:id" key="/product/edit" component={ProductEditPage} />,
            <Route exact path="/product/fields" key="/product/fields" component={ProductLookupEditPage} />,
            <Route exact path="/product/filters" key="/product/filters" component={ProductFiltersPage} />,
          ]}
          <Route path="*" component={PageNotFound} />
        </Switch>
}

class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      rootStore: RootStore, // instance of RootStore that is singleton
      setRootStore: this.setRootStore.bind(this)
    }
  }

  setRootStore(newRootStore: RootStoreType) {
    this.setState({
      rootStore: newRootStore,
    });
  }

  addFavicon() {
    const existingFavicon = document.querySelector("link[rel~='icon']");
    if (!existingFavicon) {
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = `${process.env.PUBLIC_URL}static/images/logo_32x32.png`;
      document.head.appendChild(favicon);
    }
  }

  render() {
    this.addFavicon();

    return (
      <Provider store={store}>
      <RootContext.Provider value={this.state}>
        <Router>
          <StatusAlert/>
          <Header />
          <main className="content">
            <div className="container">
              <SwitchRoutes/>
            </div>
          </main>
        </Router>
      </RootContext.Provider>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);