import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("mobile");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

   const API = {
  mobile: "/api/product/products",
  food: "/api/food/products"
  };
  // 🔐 LOGIN
  const login = () => {
    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => setLoggedIn(true))
      .catch(() => alert("Invalid credentials"));
  };

  // 🚪 LOGOUT
  const logout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // 📦 LOAD PRODUCTS
  const loadProducts = () => {
    fetch(API[category])
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    if (loggedIn) loadProducts();
  }, [category, loggedIn]);

  // ➕ ADD PRODUCT
  const addProduct = () => {
    if (!name.trim() || !price.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      alert("Invalid price");
      return;
    }

    fetch(API[category], {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: Date.now(),
        name,
        price
      })
    }).then(() => {
      setName("");
      setPrice("");
      loadProducts();
    });
  };

  // ❌ DELETE PRODUCT
  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    fetch(`${API[category]}/${id}`, {
      method: "DELETE"
    }).then(() => loadProducts());
  };

  // 🔐 LOGIN PAGE
  if (!loggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>🔐 Login</h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  // 🛒 DASHBOARD
  return (
    <>
      {/* 🔥 NAVBAR */}
      <div className="navbar">
        <h2>🛒 E-Commerce</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="container">
        <h1>Dashboard</h1>

        {/* FORM */}
        <div className="form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <button onClick={addProduct}>Add</button>
        </div>

        {/* TABS */}
        <div className="tabs">
          <button onClick={() => setCategory("mobile")}>📱 Mobiles</button>
          <button onClick={() => setCategory("food")}>🍔 Food</button>
        </div>

        {/* PRODUCTS */}
        <div className="list">
          {products.map((p) => (
            <div className="card" key={p.id}>
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>

              <button
                className="delete-btn"
                onClick={() => deleteProduct(p.id)}
              >
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;