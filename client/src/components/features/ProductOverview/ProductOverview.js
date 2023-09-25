import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, loadProductsRequest } from "../../../redux/productsRedux";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const ProductOverview = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector((state) => getProductById(state, id));

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch, id]);

  if (!data) {
    return (
      <Spinner animation="border" role="status" className="d-block mx-auto">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }  

  console.log(data);

  return (
    <>
      Hello World!
    </>
  );

}

export default ProductOverview;