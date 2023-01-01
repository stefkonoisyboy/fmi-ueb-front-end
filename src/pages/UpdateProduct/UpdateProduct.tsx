import React from "react";
import { useParams } from "react-router-dom";
import UpdateProductForm from "../../components/containers/UpdateProductForm/UpdateProductForm";

export type UpdateProductRouteParams = {
  id: string;
};

const UpdateProduct = () => {
  const { id } = useParams<UpdateProductRouteParams>();

  return <UpdateProductForm id={id as string} />;
};

export default UpdateProduct;
