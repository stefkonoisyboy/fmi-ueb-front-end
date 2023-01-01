import { useQuery, useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../utils/constants";
import { messageError, messageSuccess } from "../utils/notifications";

export type CreateProductInputModel = {
  productName: string;
  productDescription: string;
  imageUri: string;
  purchasePrice: number;
  sellPrice: number;
  productQuantity: number;
  productCategory: string;
  productCode: string;
};

export type GetAllProductsViewModel = {
  productID: number;
} & CreateProductInputModel;

// React Query Hooks

export function useProducts() {
  return useQuery(["products"], getAllProducts);
}

export function useSingleProduct(id: number) {
  return useQuery(["products", id], () => getSingleProduct(id));
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation(createProduct, {
    onMutate: () => {
      console.log("useCreateProduct: onMutate hook was triggered");
    },
    onSuccess: () => {
      messageSuccess("A product was added!");
      console.log("A product was added!");
    },
    onError: (error: AxiosError) => {
      messageError("Error with product validations!");
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation(updateProduct, {
    onMutate: () => {
      console.log("useUpdateProduct: onMutate hook was triggered");
    },
    onSuccess: () => {
      messageSuccess("A product was updated!");
      console.log("A product was updated!");
    },
    onError: (error: AxiosError) => {
      messageError("Error with product validations!");
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation(deleteProduct, {
    onMutate: () => {
      console.log("useDeleteProduct: onMutate hook was triggered");
    },
    onSuccess: () => {
      messageSuccess("A product was deleted!");
      console.log("A product was deleted!");
    },
    onError: (error: AxiosError) => {
      messageError(error.response?.data as string);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}

// API methods

export const getAllProducts = async () => {
  const response = await axios.get<GetAllProductsViewModel[]>(
    `${BASE_URL}/products`
  );
  return response.data;
};

export const getSingleProduct = async (id: number) => {
  const response = await axios.get<GetAllProductsViewModel>(
    `${BASE_URL}/products/byId?productID=${id}`
  );
  return response.data;
};

export const createProduct = async (inputModel: CreateProductInputModel) => {
  await axios.post(`${BASE_URL}/products`, inputModel);
};

export const updateProduct = async (inputModel: GetAllProductsViewModel) => {
  await axios.put(`${BASE_URL}/products/update`, inputModel);
};

export const deleteProduct = async (id: number) => {
  await axios.delete(`${BASE_URL}/products/delete?productID=${id}`);
};
