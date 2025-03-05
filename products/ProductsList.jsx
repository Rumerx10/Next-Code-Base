import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "./productSlice";
import ProductForm from "./CreateProductForm";
import UpdateProductForm from "./UpdateProductForm";

const ProductsList = () => {
  const [updateProduct, setUpdateProduct] = useState(null);
  const { products, loading, error } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <h1>Products</h1>

      {updateProduct ? <UpdateProductForm productToUpdate={updateProduct} setUpdateProduct={setUpdateProduct} />:<ProductForm />}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!loading &&
          !error &&
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <h1 className="text-lg text-teal-700">{product.title}</h1>
              <p className="text-sm">{product.description}</p>
              <p className="text-sm">{product.price}</p>
              <p className="text-sm">{product.rating}</p>
              <button
                className="px-2 py-1 bg-red-600 text-white hover:bg-red-500 active:bg-red-600 mt-2 rounded text-xs cursor-pointer"
                onClick={() => dispatch(deleteProduct(product.id))}
              >
                Delete
              </button>
              <button                
                className="px-2 py-1 ml-2 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-600 mt-2 rounded text-xs cursor-pointer"
                onClick={()=>setUpdateProduct(product)}
              >
                Edit
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsList;
