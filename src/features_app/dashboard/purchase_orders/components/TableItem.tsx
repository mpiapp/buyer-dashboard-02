import React, { useState } from 'react';
import { 
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    Box, 
    Stack,
    Button,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { postApprovalReject } from '../reducers/purchaseOrdersReducers';
import TableItemGRN from './TableItemGRN';


const TableItem : React.FC<any> = ({ data, status, dataOrders }) => {

  const dispatch = useDispatch()
  const store_purchaseorders = useSelector((state : RootState) => state.purchase_orders)

  const [dataGRN, setDataGRN] = useState({
    grn : false,
    id : null,
    data : []
  });
  const [statusAction, setStatusAction] = useState("");
  // console.log(store_purchaseorders)

  // console.log(data, 'status')

  const onClickActionItem = (status : any, row : any, package_id : any) => {
    setStatusAction(status)
    let data_send = {
      data : {
        vendorId : row.vendorId,
        packageId : package_id,
        itemsId : row._id
      },
      status : status
    }
    dispatch(postApprovalReject(data_send))

  }

  return (
    <>
    <Box>
      { data.length === 0  ? `You dont have any ${status} package yet!` :
      <Box>
      { data.map((element:any, i:any) => (
          <div key={i}>
          { element._id === dataGRN.id ? 
          <TableItemGRN 
            element={dataGRN.data}
            setDataGRN={setDataGRN}
            dataGRN={dataGRN}
            dataOrders={dataOrders}
          />
          : 
          <Box mb={2} key={i}>
            <Box>
              <Paper elevation={3}>
                <Stack flexDirection="row" justifyContent="space-between" sx={{ p: 2 }}>
                  <Box>
                    <h4>Package ID: {element._id}</h4>
                    <h4>Payment Terms : {element.payment_terms}</h4>
                  </Box>
                  <Box>
                    { element.lastStatus === "Shipped" ? 
                    <Button 
                      variant="contained" color="info" size="small"
                      onClick={() => setDataGRN({...dataGRN, grn: true, data : element, id : element._id })}  
                    >
                      Create Good Receipt Note
                    </Button> : null }
                  </Box>
                </Stack>
              </Paper>
            </Box>
            <TableContainer component={Paper}>
              <Table aria-label="simple table"  > 
                  <TableHead>
                    <TableRow >
                        <TableCell width="20px">NO</TableCell>
                        <TableCell width="130px">SKU</TableCell>
                        <TableCell width="450px">NAME</TableCell>
                        <TableCell width="150px">RETAIL PRICE</TableCell>
                        <TableCell width="100px">DISCOUNT</TableCell>
                        <TableCell width="180px">DISCOUNT PRICE</TableCell>
                        <TableCell width="80px">QTY</TableCell>
                        <TableCell width="180px">SUB TOTAL</TableCell>
                        { status === "Pick" ? 
                        <>
                        <TableCell width="150px">NOTE</TableCell> 
                        <TableCell width="150px">STATUS</TableCell> 
                        <TableCell width="150px">ACTION</TableCell> 
                        </> : null }
                    </TableRow>
                  </TableHead> 
                  <TableBody >
                  { element.items.map((row :any, i : any) => (
                    <TableRow key={i} >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.sku}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        { status === "Pick" && row.retail_price !== row.retail_price_original ? 
                          <Box className='span-linethrought'>
                            Rp. {row.retail_price_original.toLocaleString()}
                          </Box> 
                        : null }
                        RP. {row.retail_price.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.discount}%
                      </TableCell>
                      <TableCell component="th" scope="row">
                        { status === "Pick" && row.discount_price !== row.discount_price_original ? 
                          <Box className='span-linethrought'>
                            Rp. {row.discount_price_original.toLocaleString()}
                          </Box> 
                        : null }
                        RP. {row.discount_price.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        { status === "Pick" && row.quantity !== row.quantity_original  ? 
                          <Box className='span-linethrought'>
                            {row.quantity_original}
                          </Box> 
                        : null }
                        {row.quantity}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        { status === "Pick" && row.sub_total !== row.sub_total_original ? 
                          <Box className='span-linethrought'>
                            Rp. {row.sub_total_original.toLocaleString()}
                          </Box> 
                        : null }
                        RP. {row.sub_total.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        { status === "Pick" && row.note !== "" ? 
                          <Box>
                            {row.note === "" ? "-" : row.note}
                          </Box> 
                        : null }
                      </TableCell>
                      <TableCell component="th" scope="row">
                        { status === "Pick" ? 
                          <Box>
                            { row.sub_total !== row.sub_total_original ? "Changed" : "Accepted"}
                          </Box> 
                        : null }
                      </TableCell>
                      <TableCell component="th" scope="row">
                      { status === "Pick" && row.sub_total !== row.sub_total_original && row.statuses.length === 0 ? 
                        <Stack flexDirection="row">
                          <Button 
                            color="success"
                            onClick={() => onClickActionItem('Accept', row, element._id)}

                          >{ statusAction === "Accept" && store_purchaseorders.loading_item_pick ? <CircularProgress color="inherit" /> : "Approve" }</Button>
                          <Button 
                            color="error"
                            onClick={() => onClickActionItem('Reject', row, element._id )}
                          
                            >{ statusAction === "Accept" && store_purchaseorders.loading_item_pick ? <CircularProgress color="inherit" /> : "Reject" }</Button>
                        </Stack> : null }
                      </TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
              </Table>
            </TableContainer>
        </Box>
        }
        </div>
      )) }
      </Box>
      }
    </Box>
    </>
    )
}

export default TableItem