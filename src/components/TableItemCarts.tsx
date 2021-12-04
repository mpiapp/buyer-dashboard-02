import React, { useEffect, useState } from 'react'
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid, 
    Box, 
    Button
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { groupBy } from 'lodash'
import { useDispatch } from 'react-redux';
import { 
    addQuantityProduct, 
    removeVendorItems, 
    removeItemProduct, 
    removeQuantityProduct 
} from '../features_app/dashboard/purchase_requests/create/reducers/createPurchaseRequestReducers';

const TableItemCarts : React.FC<any> = ({ dataCartProps }) => {

    const dispatch = useDispatch()

    console.log(dataCartProps, 'data carts')

    const [groupCart, setGroupCart] = useState<any>([]);
    const [loaded, setLoaded] = useState(false);

    // console.log(groupCart, 'carts')

    useEffect(() => {
        const proceedCart = () => {
          let copy = [...dataCartProps]
          const convert_array = Object.entries(groupBy(copy, 'vendor_name'));
          let final_data : any = convert_array.map(function(key) { 
            return { 
              vendor_name: key[0], 
              items: key[1] 
            }; 
          });
          setGroupCart(final_data)
          setLoaded(true)
        }
        proceedCart()
    }, [dataCartProps]);

    function sumSubPrice (data:any) {
        const totalPriceVendor = data.reduce((total : any, data : any) => {
          return total + data.sub_total
        }, 0)
        return totalPriceVendor;
    }


    return (
    <div>
        { loaded && groupCart.map((data : any, index : any) => (
            <Box mb={4} key={index}>
            <TableContainer>
                <Paper square variant="outlined">
                    <div className="vendor-title" >
                        <h3>{data.vendor_name}</h3>
                        <Box mr={6}>
                            <Button 
                                variant="outlined" 
                                color="error" 
                                size="small" 
                                onClick={() => dispatch(removeVendorItems({
                                    vendor_name : data.vendor_name
                                }))}
                            >
                                Remove Vendor Items
                            </Button>
                        </Box>
                    </div>
                </Paper>
                <Paper square variant="outlined">
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow >
                            <TableCell  width="40px">NO</TableCell>
                            <TableCell  width="200px">SKU</TableCell>
                            <TableCell  width="300px">NAME</TableCell>
                            <TableCell >VENDOR</TableCell>
                            <TableCell >RETAIL PRICE</TableCell>
                            <TableCell >DISCOUNT</TableCell>
                            <TableCell >DISCOUNT PRICE</TableCell>
                            <TableCell >QUANTITY</TableCell>
                            <TableCell >SUB TOTAL</TableCell>
                            <TableCell >ACTION</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.items.map((value : any, index : any) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row" >{index + 1}</TableCell>
                                <TableCell component="th" scope="row">{value.sku}</TableCell>
                                <TableCell component="th" scope="row">{value.name}</TableCell>
                                <TableCell component="th" scope="row">{value.vendor_name}</TableCell>
                                <TableCell>RP. {parseInt(value.retail_price).toLocaleString()}</TableCell>
                                <TableCell>{value.discount}%</TableCell>
                                <TableCell>RP. {value.discount_price.toLocaleString()}</TableCell>
                                <TableCell> 
                                    <Grid container>
                                        <Grid item>
                                            <Box 
                                                pr={1} 
                                                style={{cursor: 'pointer'}}
                                                onClick={() => dispatch(removeQuantityProduct({
                                                    name : value.name,
                                                    discount_price : value.discount_price,
                                                    retail_price : value.retail_price
                                                }))}
                                            >
                                                <RemoveCircleOutlineIcon color="error"/>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box pr={1}>
                                                {value.quantity}
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box 
                                                pr={1} 
                                                style={{cursor: 'pointer'}}
                                                onClick={() => dispatch(addQuantityProduct({
                                                    name : value.name,
                                                    discount_price : value.discount_price,
                                                    retail_price : value.retail_price
                                                }))}
                                            >
                                                <AddCircleIcon color="success"/>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>RP. {value.sub_total.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Grid container>
                                        <Grid item>
                                        <Box 
                                            pr={1} 
                                            style={{cursor: 'pointer'}} 
                                            onClick={() => dispatch(removeItemProduct({
                                                name : value.name,
                                            }))}
                                        >
                                            <DeleteForeverIcon color="error"/>
                                        </Box>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper square variant="outlined">
                    <Box p={2} mr={6}>
                        <div className="sub-total-cart">
                            <h4>Sub Total</h4>
                            <h4>Rp. {sumSubPrice(data.items).toLocaleString()}</h4>
                        </div> 
                        <div className="sub-total-cart">
                            <h4>Discount by Vendor 0%</h4>
                            <h4>Rp. 0</h4>
                        </div>
                        <div className="sub-total-cart">
                            <h3>Total Price / Vendor</h3>
                            <h3>Rp. {sumSubPrice(data.items).toLocaleString()}</h3>
                        </div>
                    </Box>
                </Paper>
            </TableContainer>
        </Box>
        ))}
    </div>
    )
}

export default TableItemCarts
