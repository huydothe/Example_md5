import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProductDetail } from "../features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(id, name, calories, fat, carbs, protein) {
//   return {id, name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function ListUser(props) {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllProduct = async () => {
    return axios.get("http://localhost:3001/products");
  };

  useEffect(() => {
    getAllProduct()
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDetailProduct = (product) => {
    console.log(product);
    dispatch(getProductDetail(product));
    navigate("/detail");
  };

  const handleDelete = async (product) => {
    let id = product.id;
    console.log(id);
    axios.delete(`http://localhost:3001/products/${id}`);
  };

  const handleUpdate = (product) => {
    dispatch(getProductDetail(product));
    navigate(`/edit/${product.id}`);
  };

  return (
    <>
      <Button variant="contained">
        <Link to="/create">Create</Link>
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell align="left">Name product</StyledTableCell>
              <StyledTableCell align="left">Price (VND)</StyledTableCell>
              <StyledTableCell align="left"> stock</StyledTableCell>
              <StyledTableCell align="left"> </StyledTableCell>
              <StyledTableCell align="left"> </StyledTableCell>
              <StyledTableCell align="left"> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell align="left">{product.id}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.price}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.stock}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      variant="contained"
                      onClick={() => handleDetailProduct(product)}
                    >
                      Detail
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      variant="contained"
                      onClick={() => handleUpdate(product)}
                    >
                      Update
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListUser;
