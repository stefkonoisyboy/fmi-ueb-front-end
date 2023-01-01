import { useState, useEffect } from "react";
import {
  useDeleteProduct,
  useProducts,
} from "../../../services/productsService";
import "./ProductsTable.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Pagination,
  Stack,
  Grid,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITEMS_PER_PAGE } from "../../../utils/constants";
import SearchBar from "../SearchBar/SearchBar";
import {
  isLoadingAtom,
  searchCategoryAtom,
  searchCodeAtom,
  searchNameAtom,
  secondsAtom,
} from "../../../utils/atoms";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const ProductsTable = () => {
  const navigate = useNavigate();

  const { data: products } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [searchCode] = useAtom(searchCodeAtom);
  const [searchCategory] = useAtom(searchCategoryAtom);
  const [searchName] = useAtom(searchNameAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [seconds, setSeconds] = useAtom(secondsAtom);

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filterProducts = () => {
    return products
      ? searchCode
        ? products.filter((p) => p.productCode === searchCode)
        : searchCategory === "Всички"
        ? products.filter((p) =>
            p.productName.toLowerCase().includes(searchName.toLowerCase())
          )
        : products.filter(
            (p) =>
              p.productName.toLowerCase().includes(searchName.toLowerCase()) &&
              p.productCategory === searchCategory
          )
      : [];
  };

  useEffect(() => {
    if (seconds <= 0) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
  }, [seconds, searchCode, searchCategory, searchName]);

  return (
    <>
      <SearchBar />
      <div className="container">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Name</div>
            <div className="col col-2">Description</div>
            <div className="col col-3">Image</div>
            <div className="col col-4">Purchase Price</div>
            <div className="col col-5">Sell Price</div>
            <div className="col col-6">Quantity</div>
            <div className="col col-7">Category</div>
            <div className="col col-8">Code</div>
            <div className="col col-9">Actions</div>
          </li>
          {isLoading ? (
            <LoadingSpinner />
          ) : filterProducts().length ? (
            filterProducts()
              .slice(
                (page - 1) * ITEMS_PER_PAGE,
                (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
              )
              .map((product) => (
                <div key={product.productID}>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      <strong>
                        Are you sure you want to delete this product?
                      </strong>
                    </DialogTitle>
                    <DialogActions>
                      <Grid container>
                        <Grid item lg={6} display="flex" justifyContent="start">
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={handleClose}
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item lg={6} display="flex" justifyContent="end">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              deleteProduct(product.productID);
                              handleClose();
                            }}
                            autoFocus
                          >
                            Yes
                          </Button>
                        </Grid>
                      </Grid>
                    </DialogActions>
                  </Dialog>
                  <li className="table-row">
                    <div className="col col-1" data-label="Name">
                      {product.productName}
                    </div>
                    <div className="col col-2" data-label="Description">
                      {product.productDescription}
                    </div>
                    <div className="col col-3" data-label="Image">
                      {product.imageUri ? (
                        <img
                          src={product.imageUri}
                          alt="product"
                          width={50}
                          height={50}
                        />
                      ) : (
                        "No Image"
                      )}
                    </div>
                    <div className="col col-4" data-label="Purchase Price">
                      ${product.purchasePrice}
                    </div>
                    <div className="col col-5" data-label="Sell Price">
                      ${product.sellPrice}
                    </div>
                    <div className="col col-6" data-label="Quantity">
                      {product.productQuantity}
                    </div>
                    <div className="col col-7" data-label="Category">
                      {product.productCategory}
                    </div>
                    <div className="col col-8" data-label="Code">
                      {product.productCode}
                    </div>
                    <div className="col col-9" data-label="Code">
                      <IconButton
                        onClick={() => navigate(`/edit/${product.productID}`)}
                      >
                        <EditIcon color="warning" />
                      </IconButton>
                      <IconButton onClick={handleClickOpen}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </div>
                  </li>
                </div>
              ))
          ) : (
            <h2 style={{ textAlign: "center" }}>Няма намерени продукти!</h2>
          )}
        </ul>

        <Stack sx={{ marginTop: "-15px" }}>
          <Pagination
            variant="text"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            color="secondary"
            count={Math.ceil(Number(filterProducts().length) / ITEMS_PER_PAGE)}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
};

export default ProductsTable;
