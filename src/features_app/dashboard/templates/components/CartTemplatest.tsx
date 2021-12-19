import { useState, useEffect } from 'react';
import { Paper, Button, Stack, CircularProgress, TextField} from '@mui/material';
import imgemptycart from '../../../../assets/img/icon/empty_cart.svg'
import { Box } from '@mui/system'
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../../app/store';
import { 
  getLocalDBTemplate, 
  resetCartTemplate, 
  saveTemplate,
} from '../create/reducers/createNewTemplateReducers';
import Drawer from '@mui/material/Drawer';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import SnackBarAlert from './../../../../components/SnackBarAlert';
import TableItemTemplate from './TableItemTemplate';
import { useLocation } from 'react-router-dom';

const CartTemplates : React.FC<any> = () => {
  const dispatch = useDispatch()
  
  const store_carts = useSelector((store : RootState) => store.carts_template) 
  const location = useLocation()
  const data_location : any = location.state

  // console.log(data_location, 'data location template')
  // console.log(store_carts,'store carts')

  const [initialSaved, setInitialSaved] = useState<any>({});

  // console.log(initialSaved, 'initial saved')
  const [templateName, setTemplateName] = useState("");
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
    dispatch(getLocalDBTemplate())
    setInitialIDCart()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(store_carts.success_save) {
      setTimeout(() => {
        window.location.reload()
      }, 1500);
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
      dispatch(getLocalDBTemplate())
    }
    // eslint-disable-next-line
  }, [store_carts.success_add]);

  useEffect(() => {
    if(store_carts.success_reset) {
      setopenSnackBar(true)
      dispatch(getLocalDBTemplate())
    }
    // eslint-disable-next-line
  }, [store_carts.success_reset]);

  useEffect(() => {
    if(store_carts.submit) {
      dispatch(getLocalDBTemplate())
    }
    // eslint-disable-next-line
  }, [store_carts.submit]);

  useEffect(() => {
    if(data_location !== undefined) {
      setTemplateName(data_location.data.name)
    }
  }, [data_location]);

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

  function onClickSaveTemplate(e:any) {
    e.preventDefault()
    
    dispatch(saveTemplate({ 
      value : dataCartProps,
      total : sumTotalPrice(dataCartProps),
      type : initialSaved.change,
      template_name : templateName,
      update : data_location !== undefined ? true : false,
      id : data_location !== undefined ? data_location.data._id : null,
    }))
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
                  <h4>View Carts</h4>
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
                        onClick={() => dispatch(resetCartTemplate())}
                    >
                        Reset Cart
                    </Button>
                  </Box>
                </Stack>
                
                <div className="content-cart">
                    <TableItemTemplate 
                      dataCartProps={dataCartProps}
                    />
                </div>
            </div>
            <Box pt={2} >
              <Paper elevation={4}>
                <div className="total-cart">
                  <h2>Total Rp. {sumTotalPrice(dataCartProps).toLocaleString()}</h2>
                  <div className="right-button">
                    <form onSubmit={onClickSaveTemplate}>
                      <TextField 
                        label="Template Name"
                        size="small"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        required
                      />
                      <Button 
                        color="primary" 
                        variant="outlined" sx={{ mr:2, ml : 2 }}
                        type='submit'
                        disabled={initialSaved.saved ? true : false}
                      >
                        { store_carts.loading_save ? 
                          <div className="loading-button"> 
                            <p>Loading</p>  
                            <CircularProgress size={20} />
                          </div> : "Save Template"
                        }
                      </Button>
                    </form>
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
                      <h3>You cart is empty!</h3>
                    </div>
                </div>
            </div>
          </Stack> }

        </Drawer>
        <SnackBarAlert message={store_carts?.message_snackbar} initialState={openSnackBar} />
    </div>
  );
}


export default CartTemplates;