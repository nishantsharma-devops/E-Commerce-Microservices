const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, name: "Burger", price: 200 },
  { id: 2, name: "Pizza", price: 500 },
  { id: 3, name: "Sandwich", price: 150 }
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
app.listen(3002, () => {
  console.log("Food service running on port 3002");
});