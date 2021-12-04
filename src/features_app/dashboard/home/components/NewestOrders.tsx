import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system'
import { TableColumn } from 'react-data-table-component';
import DataTableBase from '../../../../components/TableData'
import { INewestProduct } from './cardStatisticTypes';
// import {userCredentials} from './../../../utilities/config'

const NewestOrders = () => {


    // console.log(userCredentials, 'userrr')

    const data = [
        {
            "_id" : "gsdawe",
            "date": "12 Oktober 2022",
            "company": "PT Luxofood Indonesia",
            "payment_terms": "2 Weeks",
            "total_item": 50,
            "total_price": 5000000,
        },
        {
            "_id" : "gsdawe",
            "date": "14 Oktober 2022",
            "company": "PT Luxofood Sing",
            "payment_terms": "1 Weeks",
            "total_item": 50,
            "total_price": 7500000,
        },
        {
            "_id" : "gsdawe",
            "date": "12 Oktober 2022",
            "company": "PT Luxofood Indonesia",
            "payment_terms": "2 Weeks",
            "total_item": 50,
            "total_price": 5000000,
        },
        {
            "_id" : "gsdawe",
            "date": "14 Oktober 2022",
            "company": "PT Luxofood Sing",
            "payment_terms": "1 Weeks",
            "total_item": 50,
            "total_price": 7500000,
        },
        {
            "_id" : "gsdawe",
            "date": "12 Oktober 2022",
            "company": "PT Luxofood Indonesia",
            "payment_terms": "2 Weeks",
            "total_item": 50,
            "total_price": 5000000,
        },
        {
            "_id" : "gsdawe",
            "date": "14 Oktober 2022",
            "company": "PT Luxofood Sing",
            "payment_terms": "1 Weeks",
            "total_item": 50,
            "total_price": 7500000,
        },
        
    ]

    const columns: TableColumn<INewestProduct>[] = [
        {
            name: 'NO',
            width: '70px',
            cell: (row, index) => (
                <p>{index + 1}</p>
            )
        },
        {
            name: 'DATE',
            selector: row => row.date,
        },
        {
            name: 'COMPANY',
            selector: row => row.company,
        },
        {
            name: 'PAYMENT TERMS',
            selector: row => row.payment_terms,
        },
        {
            name: 'TOTAL ITEM',
            selector: row => row.total_item,
        },
        {
            name: 'TOTAL PRICE',
            cell: (row) => (
                <div>Rp. {row.total_price.toLocaleString()}</div>
            ),
        },
        {
            name: 'ACTION',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                    >
                        Message
                    </Button>
                    <Button 
                        variant="outlined" color="secondary" size="small"
                    >
                        View
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box>
            <Stack sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Box fontWeight="500" fontSize={25}>
                    Latest Orders
                </Box>
                <Box pt={1}>
                    <Button href="/dashboard/orders" variant="outlined" size="small">View All</Button>
                </Box>
            </Stack>
            <Box pt={2}>
                <DataTableBase 
                    columns={columns}
                    data={data}
                />
            </Box>
        </Box>
    )
}

export default NewestOrders
