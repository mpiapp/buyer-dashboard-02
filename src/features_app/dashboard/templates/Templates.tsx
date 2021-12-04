import { Stack, Button } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { Box } from '@mui/system'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { TableColumn } from 'react-data-table-component';
import DataTableBase from '../../../components/TableData';
import { IDataRowTemplates } from './templateTypes';

function Templates() {

    const history = useHistory()

    const data = [
        {
            "_id" : "gsdasdfadawe",
            "date": "12/9/2022",
            "author": "Surya Aris",
            "vendor": "Dmatik",
            "total_price": "12800000",
            "name": "Template AB"
        },
        {
            "_id" : "gsdasdfadawe",
            "date": "12/9/2022",
            "author": "Surya Gunawan",
            "vendor": "Eratik",
            "total_price": "22800000",
            "name": "Template AB"
        },
    ]

    const columns: TableColumn<IDataRowTemplates>[] = [
        {
            name: 'NO',
            width: '70px',
            cell: (row, index) => (
                <p>{index + 1}</p>
            )
        },
        {
            name: 'NAME',
            selector: row => row.name,
        },
        {
            name: 'DATE',
            selector: row => row.date,
        },
        {
            name: 'AUTHOR',
            selector: row => row.author,
        },
        {
            name: 'VENDOR',
            selector: row => row.vendor,
        },
        {
            name: 'TOTAL PRICE',
            cell: (row) => (
                <div>Rp. {parseInt(row.total_price).toLocaleString()}</div>
            )
        },
        {
            name: 'DETAIL',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                        onClick={() => {
                            history.push({
                                pathname: `/dashboard/custom-role/${row._id}`
                            })
                        }}
                    >
                        Update
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Templates Page"
            />
           <Stack direction="row" justifyContent="space-between" pt={3} >
                <Box>
                    <h2>Templates</h2>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <Link to="/dashboard/create/template">
                        <Button variant="contained" color="primary">
                            Create New Template
                        </Button>
                    </Link>
                </Box>
            </Stack>

            <Box sx={{pt:3}}>
                <DataTableBase 
                    columns={columns}
                    data={data}
                    // progressPending={usersuperadmin?.loading}
                />
            </Box>
        </Box>
    )
}

export default Templates;
