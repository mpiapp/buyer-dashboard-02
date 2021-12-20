import { useState, useEffect } from 'react';
import { Paper, Button, Stack, CircularProgress} from '@mui/material';
import imgemptycart from '../assets/img/icon/empty_cart.svg'
import { Box } from '@mui/system'
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store';
import { getLocalDBCarts, resetCart, savePurchaseRequest, submitPurchaseRequest } from '../features_app/dashboard/purchase_requests/create/reducers/createPurchaseRequestReducers';
import Drawer from '@mui/material/Drawer';
import TableItemCarts from './TableItemCarts';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import SnackBarAlert from './SnackBarAlert';


const CartPurchaseRequest : React.FC<any> = () => {
  const dispatch = useDispatch()

  const store_carts = useSelector((store : RootState) => store.carts) 
  const [initialSaved, setInitialSaved] = useState<any>({});

  // console.log(initialSaved, 'initial saved')
  const [openSnackBar, setopenSnackBar] = useState(false);
  const [dataCartProps, setDataCartProps] = useState<any[]>([]);
  const [state, setState] = useState(false);

  const toggleDrawer = (value : any) => {
    setState(value);
  }

  const setInitialIDCart = () => {
    let id_cart_pr = {
      saved: false,
      change: false,
      id : null
    }
    let local_IDcart = localStorage.getItem('id_cart_pr')
    if(local_IDcart === null) {
      setInitialSaved(id_cart_pr)
      localStorage.setItem('id_cart_pr', JSON.stringify(id_cart_pr))
    } else {
      setInitialSaved(JSON.parse(local_IDcart))
    }
  }

  const updateInitialIDCart = () => {
    let id_cart_pr = {
      saved: false,
      change: true,
      id : initialSaved.id
    }
    localStorage.setItem('id_cart_pr', JSON.stringify(id_cart_pr))
    setInitialIDCart()
  }

  useEffect(() => {
    dispatch(getLocalDBCarts())
    setInitialIDCart()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(store_carts.success_save) {
      setInitialIDCart()
    }
  }, [store_carts.success_save]);

  useEffect(() => {
    if(!store_carts.loading) {
      setDataCartProps(store_carts.carts)
      setopenSnackBar(false)
    }
    // eslint-disable-next-line
  }, [store_carts.loading]);

  useEffect(() => {
    if(store_carts.success_add) {
      setopenSnackBar(true)
      updateInitialIDCart()
      dispatch(getLocalDBCarts())
    }
    // eslint-disable-next-line
  }, [store_carts.success_add]);

  useEffect(() => {
    if(store_carts.success_reset) {
      setopenSnackBar(true)
      dispatch(getLocalDBCarts())
    }
    // eslint-disable-next-line
  }, [store_carts.success_reset]);

  useEffect(() => {
    if(store_carts.submit) {
      dispatch(getLocalDBCarts())
    }
    // eslint-disable-next-line
  }, [store_carts.submit]);

  function sumTotalPrice (data : any) {
    const totalPriceALl = data.reduce((total : any, data : any) => {
      return total + data.sub_total
    }, 0)
    return totalPriceALl;
  }

  function sumTotalQuantity (data : any) {
    const itemQuantity = data.reduce((total : any, data : any) => {
      return total + data.quantity
    }, 0)
    return itemQuantity;
  }

  return (
      <div className="menu-cart-button">
        <button onClick={() => toggleDrawer(true)}>
          <Box sx={{display: 'flex'}}>
            <div className="cart-menu">
              <Badge badgeContent={`${sumTotalQuantity(dataCartProps)}`} color="error">
                  <ShoppingBasketIcon style={{color: "#fff"}}/>
              </Badge>
              <div className="cart-text">
                  <h4>View PR</h4>
                  <ArrowDropDownIcon style={{color: "#fff"}}/>
              </div>
            </div>
          </Box>
        </button>
        <Drawer
            anchor="bottom"
            open={state}
            onClose={() => toggleDrawer(false)}
            style={{ width: 600 }}
        >
          <Stack direction="row" justifyContent="flex-end" sx={{mr:6}}>
            <Box onClick={() => toggleDrawer(false)}>
              <ExpandCircleDownIcon 
                style={{ 
                  marginTop: 10,
                  color: '#000', 
                  cursor: 'pointer',
                  fontSize: 30 
                }}/>
            </Box>
          </Stack>
          { dataCartProps.length !== 0 ?
          <Stack>
            <div className="box-menu-cart" >
                <Stack flexDirection="row" alignItems="center">
                  <Box pb={3}>
                    <h2>Total Items Quantity ({sumTotalQuantity(dataCartProps)})</h2>
                  </Box>
                  <Box pb={2} pl={2}>
                    <Button 
                        variant="contained" 
                        color="error" 
                        size="small" 
                        onClick={() => dispatch(resetCart())}
                    >
                        Reset PR
                    </Button>
                  </Box>
                </Stack>
                
                <div className="content-cart">
                    <TableItemCarts 
                      dataCartProps={dataCartProps}
                    />
                </div>
            </div>
            <Box pt={2} >
              <Paper elevation={4}>
                <div className="total-cart">
                  <h2>Total Rp. {sumTotalPrice(dataCartProps).toLocaleString()}</h2>
                  <div className="right-button">
                    {/* <h6>Save as a template</h6> */}
                    <Button 
                      color="primary" variant="outlined" sx={{ mr:2 }}
                      onClick={() => dispatch(savePurchaseRequest({
                        value : dataCartProps,
                        total : sumTotalPrice(dataCartProps),
                        type : initialSaved.change,
                      }))}
                      disabled={initialSaved.saved ? true : false}
                    >
                      { store_carts.loading_save ? 
                        <div className="loading-button"> 
                          <p>Loading</p>  
                          <CircularProgress size={20} />
                        </div> : "Save Purchase Requests"
                      }
                    </Button>
                    <Button 
                      color="success" 
                      variant="contained" 
                      disabled={initialSaved.saved  ? false : true}
                      onClick={() => dispatch(submitPurchaseRequest())}
                    >
                      { store_carts.loading_submit ? 
                        <div className="loading-button"> 
                          <p>Loading</p>  
                          <CircularProgress size={20} />
                        </div> : "Submit Purchase Requests" 
                      }
                    </Button>
                  </div>
                </div>
              </Paper>
            </Box>
          </Stack> :
          <Stack sx={{ p: 4 }}>
            <div className="box-menu-cart" >
                <div className="content-cart-empty">
                    <div>
                      <img alt="img empty cart" src={imgemptycart} />
                      <h3>You PR is empty!</h3>
                    </div>
                </div>
            </div>
          </Stack> }

        </Drawer>
        <SnackBarAlert message={store_carts?.message_snackbar} initialState={openSnackBar} />
    </div>
  );
}


export default CartPurchaseRequest;