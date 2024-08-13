import { useState, useEffect } from 'react'
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToCart } from '../../Store/Slices/CartSlice';
import {useDispatch} from 'react-redux'

export default function ProductCard() {
  const [state, setState] = useState([])
  const [category, setCategory] = useState([])
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()
  const query = searchParams.get('cat_name')

  const _useNavigate = useNavigate()


  const getAllCategoery = () => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data)
      })
    // show the list of all products category
  }

  const getAllProduct = () => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setState(res.data)
      })
    // show the list of all products
  }

  const getDataByCategoreyName = (cat_name) => {
    // alert(cate_name)
    axios.get("https://fakestoreapi.com/products/category/" + cat_name)
      .then((res) => {
        // console.log(res.data);
        setState(res.data)
      })
    // change the list of all products by category name
  }

  const AddToCart=(data)=>{
    // alert(data)
    // alert(data)
    dispatch(addToCart(data))
  }

  const ViewProductDetails = (id) => {
    // alert(id)
    _useNavigate(`product-details/${id}`)
  }

  useEffect(() => {
    if (query != null) {
      getAllProduct()
      getAllCategoery()
      getDataByCategoreyName(query)
    }
    else {
      getAllProduct()
      getAllCategoery()
    }
  }, [query]
  )
  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-md-2">
          <ul class="list-group">
            <h5 className="list-group-item active" aria-current="true">Categories</h5>
            {
              category.map((item, index) =>
                <li key={index} className="list-group-item">
                  <a href="javascript:void(0)" className="list-group-item list-group-item-action" onClick={() => { getDataByCategoreyName(item) }}>{item}</a>
                </li>
              )
            }

          </ul>
        </div>
        <div className="col-md-10">
          <div className="container">
            <div className="row">
              {
                state.map((item, index) =>
                  <Card sx={{ maxWidth: 345, margin: 0.5 }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        objectFit: "contain",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title.substring(0, 20)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ color: "#fffff" }}>
                        {item.description.substring(0, 60)}
                      </Typography>
                      <Typography variant="h6" component="p" sx={{ marginTop: "8px" }}>
                        ${item.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="outlined" onClick={() => { AddToCart(item) }} sx={{ color: "#fffff" }}>
                        Add to Cart
                      </Button>
                      <Button variant="outlined" onClick={() => { ViewProductDetails(item.id) }} sx={{ color: "#fffff" }}>
                        View
                      </Button>
                    </CardActions>
                  </Card>
                )
              }
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
