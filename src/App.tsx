import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import ParticularProduct from "./components/ParticularProduct/ParticularProduct";
import Cart from "./components/Cart/Cart";
import Page404 from "./components/Page404/Page404";

import { CurrencyProvider } from "./context/currencyContext";
import { Query } from "@apollo/client/react/components";
import GET_CATEGORIES from "./queries/getCategories";
import { ItemsProvider } from "./context/itemsContext";
import Categories from "./interfaces/categories";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ItemsProvider>
          <CurrencyProvider>
            <Router>
              <Navbar />
              <Query<Categories> query={GET_CATEGORIES}>
                {({ data, loading }) => {
                  if (data) {
                    // fetching all the categories
                    const { categories: availableCategories } = data;
                    return (
                      <Routes>
                        {/* home page redirect to /all */}
                        <Route
                          path="/"
                          element={<Navigate replace to="/all" />}
                        />
                        {/* available products page for the given category */}
                        {availableCategories.map((category, i) => (
                          <Route
                            key={`category-${i}`}
                            path={`/${category.name}`}
                            element={<Products />}
                          />
                        ))}

                        {/* particular product page for the given product */}
                        {availableCategories.map((category, i) => (
                          <Route
                            key={`product-${i}`}
                            path={`/${category.name}/:id`}
                            element={<ParticularProduct />}
                          />
                        ))}

                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<Page404 />} />
                      </Routes>
                    );
                  }
                  return <></>;
                }}
              </Query>
            </Router>
          </CurrencyProvider>
        </ItemsProvider>
      </div>
    );
  }
}

export default App;
