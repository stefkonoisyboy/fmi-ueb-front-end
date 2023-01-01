import { Button } from "@mui/material";
import { ChangeEvent, FormEvent, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetAllProductsViewModel,
  useProducts,
  useUpdateProduct,
} from "../../../services/productsService";

import "./UpdateProductForm.css";

export type UpdateProductFormProps = {
  id: string;
};

const UpdateProductForm: FC<UpdateProductFormProps> = ({ id }) => {
  const navigate = useNavigate();

  const { data: products } = useProducts();
  const product = products?.find((p) => p.productID === Number(id));
  const { mutate: updateProduct } = useUpdateProduct();

  const [inputModel, setInputModel] = useState(
    product as GetAllProductsViewModel
  );
  const [imageUri, setImageUri] = useState(inputModel?.imageUri);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e?.target?.files[0];
    const formData = new FormData();
    formData.append("file", file);

    formData.append("upload_preset", "tuohkwp0");
    const options = {
      method: "POST",
      body: formData,
    };

    return fetch(
      "https://api.Cloudinary.com/v1_1/djokeracloud/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setInputModel({
          ...inputModel,
          imageUri: res.secure_url,
        });
        setImageUri(res.secure_url);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProduct(inputModel);
    navigate("/");
  };

  return (
    <div style={{ marginTop: "30px" }} className="login-box">
      <h2>Update Product</h2>
      <form style={{ marginBottom: "20px" }} onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputModel({ ...inputModel, productName: e.target.value })
            }
            value={inputModel?.productName}
          />
          <label>Name</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputModel({
                ...inputModel,
                productDescription: e.target.value,
              })
            }
            value={inputModel?.productDescription}
          />
          <label>Description</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputModel({
                ...inputModel,
                purchasePrice: Number(e.target.value),
              })
            }
            value={inputModel?.purchasePrice}
          />
          <label>Purchase Price</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputModel({
                ...inputModel,
                sellPrice: Number(e.target.value),
              })
            }
            value={inputModel?.sellPrice}
          />
          <label>Sell Price</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputModel({
                ...inputModel,
                productQuantity: Number(e.target.value),
              })
            }
            value={inputModel?.productQuantity}
          />
          <label>Quantity</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputModel({ ...inputModel, productCode: e.target.value })
            }
            value={inputModel?.productCode}
          />
          <label>Code</label>
        </div>
        <div className="user-box">
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setInputModel({ ...inputModel, productCategory: e.target.value })
            }
            value={inputModel?.productCategory}
          >
            <option value="Хранителни стоки">Хранителни стоки</option>
            <option value="Канцеларски материали">Канцеларски материали</option>
            <option value="Строителни материали">Строителни материали</option>
          </select>
        </div>
        <Button
          sx={{ display: "flex", backgroundColor: "#3F51B5" }}
          variant="contained"
          component="label"
        >
          Upload
          <input
            onChange={handleFileUpload}
            hidden
            accept="image/*"
            multiple
            type="file"
          />
        </Button>
        {imageUri && (
          <img src={imageUri} alt="product" width={50} height={50} />
        )}
        <button type="submit">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
