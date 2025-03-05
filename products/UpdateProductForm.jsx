import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "./productSlice";

const UpdateProductForm = ({ productToUpdate, setUpdateProduct }) => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });

  useEffect(() => {
    {
      productToUpdate && setProduct(productToUpdate);
    }
  }, [productToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product));
    setProduct({
      title: "",
      description: "",
      category: "",
      price: "",
      rating: "",
    });
    setUpdateProduct(null);
  };

  return (
    <div className="my-10">
      <form
        action=""
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-2"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">
            Product Name:
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">
            Product Description:
          </label>
          <input
            type="text"
            placeholder="Enter product description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">
            Product Category:
          </label>
          <input
            type="text"
            placeholder="Enter product category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">
            Product Price:
          </label>
          <input
            type="text"
            placeholder="Enter product price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm">
            Product Rating:
          </label>
          <input
            type="text"
            placeholder="Enter product rating"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className="px-2 py-1 rounded-lg text-black text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setUpdateProduct(null)}
            className="mt-7 py-1 md:py-0 max-w-40 px-5 border rounded-lg text-sm bg-yellow-500 active:bg-yellow-500 hover:bg-yellow-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mt-7 py-1 md:py-0 max-w-40 px-5 border rounded-lg text-sm bg-green-500 active:bg-green-500 hover:bg-green-400"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
