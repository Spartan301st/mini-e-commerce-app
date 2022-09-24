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

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/all" element={<Products />} />
            <Route path="/all/:id" element={<ParticularProduct />} />
            <Route path="/clothes" element={<Products />} />
            <Route path="/clothes/:id" element={<ParticularProduct />} />
            <Route path="/tech" element={<Products />} />
            <Route path="/tech/:id" element={<ParticularProduct />} />
            <Route path="/" element={<Navigate replace to="/all" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
