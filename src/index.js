const express = require("express");
const cors = require("cors");
const { products } = require("./data/products.json");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to filter products by IDs
app.post("/api/products", (req, res) => {
  try {
    const { ids } = req.body;

    // Validate request body
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        error: "Invalid request. Please provide an array of product IDs",
      });
    }
    console.log(ids, "hshsh");
    // Filter products and transform to object with IDs as keys
    const filteredProducts = products
      .filter((product) => ids.includes(product.id))
      .reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
      }, {});
    // Return filtered products
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Basic health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
