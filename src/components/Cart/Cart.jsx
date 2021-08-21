import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import emptySvg from '../../assets/undraw.svg';

import useStyles from './styles';
import Cartitem from './CartItem/Cartitem';

const Cart = ({ cart , handleUpdateCartQty , handleRemoveFromCart , handleEmptyCart  }) => {

    const classes = useStyles()

    const EmptyCart = () => (
        <div   style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:'column',
        }}>
        <Typography variant="subtitle1" style={{margin:'3%'}} >You have no items in your shopping cart,start adding some!
        </Typography>
        <img src={emptySvg} alt="Empty Cart" height="225px" />
        <Button component={Link} to='/' style={{marginTop:'6%'}} size="small" variant='contained' type="button" color="secondary">Shop Now</Button>
        </div>
    );

    if (!cart.line_items) return 'Loading';

    const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={3} key={item.id}>
            <Cartitem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button className={classes.emptyButton} onClick={handleEmptyCart} size="large" type="button" variant="contained" color="secondary">Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link} to='/checkout' size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    )
}

export default Cart
