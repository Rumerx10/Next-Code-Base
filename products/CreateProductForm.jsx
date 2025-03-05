import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { createProduct } from "./productSlice";

const ProductForm = () => {

  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const newProduct = {...product,id:nanoid()};
    dispatch(createProduct(newProduct));
    setProduct({
      title: "",
      description: "",
      category: "",
      price: "",
      rating: "",
    });
    
  }

  const { title, description, category, price, rating } = product;
  return (
    <div className="my-10">
      <form action="" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">Product Name:</label>
          <input
            type="text"
            placeholder="Enter product name"
            name="title"
            value={title}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">Product Description:</label>
          <input
            type="text"
            placeholder="Enter product description"
            name="description"
            value={description}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">Product Category:</label>
          <input
            type="text"
            placeholder="Enter product category"
            name="category"
            value={category}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">Product Price:</label>
          <input
            type="text"
            placeholder="Enter product price"
            name="price"
            value={price}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">Product Rating:</label>
          <input
            type="text"
            placeholder="Enter product rating"
            name="rating"
            value={rating}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <button type="submit" className="mt-7 py-1 md:py-0 max-w-40 border rounded-lg text-sm active:bg-green-500 hover:bg-green-400">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
