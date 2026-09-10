require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const Product = require("../models/product");

const products = [
  {
    name: "FanBox 1",
    description: "Heavy-duty FanBox enclosure.",
    price: 1200,
    image: "/images/IMG1.JPG",
    category: "FanBox",
    stock: 20,
    featured: true,
  },
  {
    name: "FanBox 2",
    description: "Heavy-duty FanBox enclosure.",
    price: 1300,
    image: "/images/IMG2.JPG",
    category: "FanBox",
    stock: 20,
    featured: false,
  },
  {
  name: "FanBox 3",
  description: "Heavy-duty FanBox enclosure.",
  price: 1250,
  image: "/images/IMG3.JPG",
  category: "FanBox",
  stock: 20,
  featured: false,
},
{
  name: "FanBox 4",
  description: "Heavy-duty FanBox enclosure.",
  price: 1400,
  image: "/images/IMG4.JPG",
  category: "FanBox",
  stock: 20,
  featured: false,
},
{
  name: "FanBox 5",
  description: "Heavy-duty FanBox enclosure.",
  price: 1500,
  image: "/images/IMG5.JPG",
  category: "FanBox",
  stock: 20,
  featured: false,
},
{
  name: "FanBox 6",
  description: "Heavy-duty FanBox enclosure.",
  price: 1600,
  image: "/images/IMG6.JPG",
  category: "FanBox",
  stock: 20,
  featured: false,
},
{
  name: "SpotBox 1",
  description: "Heavy-duty SpotBox enclosure.",
  price: 1800,
  image: "/images/IMG7.JPG",
  category: "SpotBox",
  stock: 20,
  featured: false,
},
{
  name: "SpotBox 2",
  description: "Heavy-duty SpotBox enclosure.",
  price: 1900,
  image: "/images/IMG8.JPG",
  category: "SpotBox",
  stock: 20,
  featured: false,
},
{
  name: "SpotBox 3",
  description: "Heavy-duty SpotBox enclosure.",
  price: 2000,
  image: "/images/IMG9.JPG",
  category: "SpotBox",
  stock: 20,
  featured: false,
},
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany(); // Clears old products

    await Product.insertMany(products);

    console.log("Products seeded successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

seedProducts();