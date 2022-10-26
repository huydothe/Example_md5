import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Paper,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";


function EditProduct() {
  const infoProduct = useSelector((state) => state.product.detailProduct);
  const [mess, setMess] = useState({
    status: "",
    mess: "",
  });

  const [state, setState] = useState({});
  const {id} = useParams();


  
    axios.get(`http://localhost:3001/products/${id}`)
    .then(res => setState(res.data))

  const [product, setProduct] = useState({
    name: state.name,
    price: state.price,
    stock: state.stoke,
    description: state.description,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleBack = () => {
    setMess({
      status: "navigate",
      mess: "Đang chuyển hướng về trang chủ...",
    });
    setTimeout(() => navigate("/"), 1500);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {
      name: product.name,
      price: product.price,
      stock: product.price,
      description: product.price,
    };

    await axios
      .put(`http://localhost:3001/products/${id}`,data )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setMess({
          status: "success",
          mess: "Chỉnh sửa thành công! Về trang chủ...",
        });
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => {
        setLoading(false);
        setMess({
          status: "error",
          mess: err.message,
        });
      });
  };
  return loading ? (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Grid container item>
        <Grid item xs></Grid>
        <Grid item xs={5}>
          <Paper elevation={3} sx={{ padding: 2, marginTop: 10 }}>
            {mess && mess.status === "error" ? (
              <Alert severity="error">{mess.mess}</Alert>
            ) : (
              ""
            )}
            {mess && mess.status === "success" ? (
              <Alert severity="success">{mess.mess}</Alert>
            ) : (
              ""
            )}
            {mess && mess.status === "navigate" ? (
              <Alert severity="info">{mess.mess}</Alert>
            ) : (
              ""
            )}
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              onSubmit={handleSubmit}
            >
              <h2 style={{ textAlign: "center" }}>Edit</h2>
              <div style={{ textAlign: "center" }}>
                <TextField
                  label="Tên Sản Phẩm"
                  onChange={handleChange}
                  required
                  type="text"
                  maxRows={6}
                  value={product.name}
                  name="name"
                />
                <TextField
                  label="Giá(đ)"
                  onChange={handleChange}
                  required
                  type="number"
                  maxRows={6}
                  value={product.price}
                  name="price"
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <TextField
                  label="Tồn Kho"
                  onChange={handleChange}
                  required
                  type="number"
                  maxRows={6}
                  value={product.stock}
                  name="stock"
                />
                <TextField
                  label="Mô tả"
                  onChange={handleChange}
                  required
                  type="text"
                  maxRows={6}
                  value={product.description}
                  name="description"
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: 5, alignItems: "center" }}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ marginTop: 1, alignItems: "center" }}
                  onClick={handleBack}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
}

export default EditProduct;
