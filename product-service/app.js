const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "iPhone 15", price: 80000 },
  { id: 2, name: "Samsung S23", price: 70000 },
  { id: 3, name: "OnePlus 12", price: 60000 }
];

// GET
app.get("/products", (req, res) => {
  res.json(products);
});

// POST
app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json({ message: "Product added", product: newProduct });
});

// ✅ DELETE (listen se pehle)
app.delete("/products/:id", (req, res) => {
     console.log("DELETE API HIT");  // 👈 ye add kar
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: "Deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// LAST mein listen
app.listen(3001, () => {
  console.log("Product service running on port 3001");
});