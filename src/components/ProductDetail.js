import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import getProductDetail from "../features/productSlice";
import getClearDetail from "../features/productSlice";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

export default function ProductDetail() {
  const product = useSelector((state) => state.product.detailProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleClose = () => {
    dispatch(getClearDetail());
    navigate('/')
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="../static/img/anh-gai-xinh-cuc-dep.jpg"
        alt="green iguana"
      />

      {product &&
        product.map((item, index) => (
          <CardContent key={index}>
            <Typography variant="body2" color="text.secondary">
              id: {item.id}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Name product: {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {item.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock: {item.stoke}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description: {item.description}
            </Typography>
            <Link to='/'>
            <Button
              variant="contained"
              onClick={() => handleClose}
            >
              Back to home page
            </Button>
            </Link>            
          </CardContent>
        ))}
    </Card>
  );
}
