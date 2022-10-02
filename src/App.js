import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import ParticularProduct from "./components/ParticularProduct/ParticularProduct";
import Cart from "./components/Cart/Cart";
import Page404 from "./components/Page404/Page404";

class App extends React.Component {
  render() {
    const availableCategories = ["all", "clothes", "tech"];
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/all" />} />
            {availableCategories.map((category, i) => (
              <Route
                key={`category-${i}`}
                path={`/${category}`}
                element={<Products />}
              />
            ))}
            {availableCategories.map((category, i) => (
              <Route
                key={`product-${i}`}
                path={`/${category}/:id`}
                element={<ParticularProduct />}
              />
            ))}
            <Route path="/cart" element={<Cart />} />
            {/* TODO: ADD NO PAGE FOUND */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
