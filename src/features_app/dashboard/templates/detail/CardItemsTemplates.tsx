import React from 'react'
import { 
    Box, 
    Paper, 
    Grid, 
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableItemDetail from './TableItemDetail';

  
const CardItemsTemplates : React.FC<any> = ({ data }) => {


    // console.log(data ,' data detail')
    
    function sumTotalPrice (data : any) {
        const totalPriceALl = data.reduce((total : any, data : any) => {
          return total + data.sub_total
        }, 0)
        return totalPriceALl;
    }

    return (
    <Stack>
        <div>
            { data?.map((val : any, i : any) => (
                <Box mb={4} mt={4} key={i} >
                    <Paper elevation={2}>
                        <Box p={2}>
                            <Grid container spacing={3} >
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                    <Box fontWeight="bold" >
                                        <Box pb={1} fontWeight="bold" fontSize={20} > Vendor Name : {val.vendor.name}</Box>
                                        <Box pb={1} > Address : {val.vendor.address}</Box>
                                        <Box pb={1} > Phone : {val.vendor.phone}</Box>
                                    </Box> 
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                    <Box fontWeight="bold" > 
                                        <Box pb={1}>Total Price : Rp. {sumTotalPrice(val.packages[0].items).toLocaleString()}</Box>
                                        <Box>Payment Terms : 30 Days</Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                        </Box>

                        <Box pt={2} >
                            <Paper elevation={3}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Box fontWeight="bold">
                                            Detail All Items  ({val.packages[0].items.length})
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box>
                                            <TableItemDetail 
                                                data={val.packages[0].items} 
                                            /> 
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </Paper>
                        </Box>

                    </Paper>
                </Box>
            ))
            }
        </div>
    </Stack>
    )
}

export default CardItemsTemplates
