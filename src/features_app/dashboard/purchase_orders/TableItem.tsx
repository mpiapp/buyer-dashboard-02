import React from 'react';
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
    Button
} from '@mui/material';


const TableItem : React.FC<any> = ({ data, status }) => {

  console.log(data, 'data item package')

  return (
    <>
      { data.length === 0  ? `You dont have any ${status} package yet!` :
      <Box>
      { data.map((element:any, i:any) => (
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
                    <Button variant="contained" color="info" size="small">
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
                        <TableCell width="350px">NAME</TableCell>
                        <TableCell width="150px">RETAIL PRICE</TableCell>
                        <TableCell width="100px">DISCOUNT</TableCell>
                        <TableCell width="150px">DISCOUNT PRICE</TableCell>
                        <TableCell width="80px">QTY</TableCell>
                        <TableCell width="180px">SUB TOTAL</TableCell>
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
                    </TableRow>
                  ))}
                  </TableBody>
              </Table>
            </TableContainer>
        </Box>
      )) }
      </Box>
      }
    </>
    )
}

export default TableItem