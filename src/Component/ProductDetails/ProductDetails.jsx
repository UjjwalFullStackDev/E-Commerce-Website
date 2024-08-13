import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';


export default function ProductDetails() {
  const _useParams = useParams()
  let { id } = useParams()
  // console.log(id)

  const [state, setState] = useState({
    image: '',
    title: '',
    description: '',
    price: '',
    category: '',
  })

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('https://fakestoreapi.com/products/' + id)
      .then((res) => {
        console.log(res);
        setState(res.data)
      })
  }, [])


  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={state.image}
              alt={state.title}
              sx={{ height: '100%', width: '100%' }}
              />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {state.title}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {state.description}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                ${state.price}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Category: {state.category}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
              <Button variant="outlined" color="secondary">
                Buy Now
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}
