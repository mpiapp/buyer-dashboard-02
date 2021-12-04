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
import TableItem from './TableItem';

  
const CardItems : React.FC<any> = ({ data }) => {
    
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
                                        <Box pb={1} fontWeight="bold" > Vendor Name : {val.vendor_name}</Box>
                                        <Box>Total Price : Rp. {sumTotalPrice(val.packages[0].items).toLocaleString()}</Box>
                                    </Box> 
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                    <Box fontWeight="bold" > 
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
                                            Detail All Items 
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box>
                                            <TableItem 
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

export default CardItems
