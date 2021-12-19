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
    TextField,
    CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { postGoodReceiptNote } from '../reducers/purchaseOrdersReducers';
import { userCredentials } from '../../../../utilities/config';


const TableItemGRN : React.FC<any> = ({ 
  element,
  setDataGRN,
  dataGRN,
  dataOrders
}) => {


  const dispatch = useDispatch()
  const store_purchaseorders = useSelector((state : RootState) => state.purchase_orders)

  const onChangeQty = (row : any, qty : any, items : any) => {
    let copy_array = [...items.items]

    if(qty >= "0" ) {
      const newData = copy_array.map((obj : any) => {
        if(obj._id === row._id)
           return {
             ...obj,
             received: parseInt(qty),
           }
        return obj
      });
      let newItems = {
        items: newData,
        lastStatus: items.lastStatus,
        payment_terms: items.payment_terms,
        statuses: items.statuses,
        total: items.total,
        updated: items.updated,
        _id: items._id
      }
      setDataGRN({...dataGRN, data : newItems})
    }
  }

  const onChangeNoteText = (row : any, note : any, items : any) => {
    let copy_array = [...items.items]
      const newData = copy_array.map((obj : any) => {
        if(obj._id === row._id)
           return {
             ...obj,
             note: note,
           }
        return obj
      });
      let newItems = {
        items: newData,
        lastStatus: items.lastStatus,
        payment_terms: items.payment_terms,
        statuses: items.statuses,
        total: items.total,
        updated: items.updated,
        _id: items._id
      }
      setDataGRN({...dataGRN, data : newItems})
  }

  const onSubmitGRN = (e : any) => {
    e.preventDefault()
    let data_grn = {
      "received": {
        "code": "DN-Code",
        "date": new Date(),
        "name": userCredentials.fullname
      },
      "vendor": dataOrders.vendor,
      "items": element.items,
      "reference_doc": {
        "packageId": element._id,
        "code_po": dataOrders.code_po,
        "code_package": element.code_package,
        "date_order": dataOrders.date
      }
    }
    dispatch(postGoodReceiptNote(data_grn))
  }

  return (
    <>
      <Box>
          <Box mb={2}>
            <form onSubmit={onSubmitGRN}>
            <Box>
              <Paper elevation={3}>
                <Stack flexDirection="row" justifyContent="space-between" sx={{ p: 2 }}>
                  <Box>
                    <h4>Package ID: {element._id}</h4>
                    <h4>Payment Terms : {element.payment_terms}</h4>
                  </Box>
                  <Box>
                    
                    <Button 
                      variant="contained" color="error" size="small"
                      onClick={() => setDataGRN({...dataGRN, grn : false, data : [], id : null})}
                    >
                      Cancel
                    </Button> 
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
                        <TableCell width="120px">GRN QTY</TableCell> 
                        <TableCell width="250px">NOTE</TableCell> 
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
                        RP. {row.retail_price.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.discount}%
                      </TableCell>
                      <TableCell component="th" scope="row">
                        RP. {row.discount_price.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.quantity}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        RP. {row.sub_total.toLocaleString()}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <TextField
                          label="QTY"
                          value={row.received === undefined ? "" : row.received}
                          onChange={(e : any) => {
                            if(e.target.value >= 0) {
                              onChangeQty(row, e.target.value, element)
                            }
                          }}
                          type="number"
                          size="small"
                          required
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <TextField
                          label="Note"
                          onChange={(e) => onChangeNoteText(row, e.target.value, element)}
                          type="text"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
              </Table>
            </TableContainer>
            <Stack flexDirection="row" justifyContent="flex-end" >
              <Box mt={2}>
                <Button 
                  variant="contained" color="primary" 
                  type="submit"
                  // onClick={() => onSubmitGRN()}
                >
                  { store_purchaseorders.loading_grn ? 
                      <div>Loading.. <CircularProgress size={20} color="inherit"/> </div> :
                      "Submit GRN"
                  }
                  {/* Submit GRN */}
                </Button>
              </Box>
            </Stack>
            </form>
        </Box>
      </Box>
    </>
    )
}

export default TableItemGRN