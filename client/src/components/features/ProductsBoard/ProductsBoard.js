import { useDispatch, useSelector } from "react-redux";
import { getProducts, loadProductsRequest } from "../../../redux/productsRedux";
import { useEffect, useState } from "react";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

const ProductsBoard = () => {
  const dispatch = useDispatch();

  const [localProducts, setLocalProducts] = useState(null);
  
  const reduxProducts = useSelector(getProducts);

  useEffect(() => {
    if (reduxProducts && Array.isArray(reduxProducts)) {
      setLocalProducts(reduxProducts);
    }
  }, [reduxProducts]);

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);
  
  return (
    <ProductsGrid products={localProducts} />
  );
};

export default ProductsBoard;
