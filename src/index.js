const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to randomly select a value for chip label
const get_random_chip_label = () => {
  const labels = ['Previously bought', 'You might like this', 'Best Seller', 'New Arrival'];
  const random_index = Math.floor(Math.random() * labels.length);
  return labels?.[random_index] || labels[0];
};

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

    // Prepare response with the required structure
    const product_response = ids.reduce((acc, product_id) => {
      acc[product_id] = {
        show_prev_ordered: Math.random() > 0.5, // Randomly decide if 'show_prev_ordered' should be true or false
        chip_label: get_random_chip_label(), // Randomly choose a chip label
      };
      return acc;
    }, {});

    // Return the constructed object
    res.json(product_response);
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
