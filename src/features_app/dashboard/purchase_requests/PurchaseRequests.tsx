import { useState, useEffect } from 'react'; 
import { Box } from '@mui/system'
import { Button, Stack } from '@mui/material';
import { useHistory } from 'react-router-dom';
import BreadCrumbs from '../../../components/BreadCrumbs'
import { TableColumn } from 'react-data-table-component';
import DataTableBase from '../../../components/TableData';
import { IDataRowPurchaseRequest } from './purchaseRequestTypes';
import MenuPopOver from '../../../components/MenuPopOver';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseRequestData } from './reducers/purchaseRequestReducers';
import { RootState } from '../../../app/store';
import moment from 'moment'

const PurchaseRequests = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const store_purchaserequest = useSelector((state : RootState) => state.purchase_request)

    const [loading, setLoading] = useState(true);
    const [dataPurchaseRequests, setDataPurchaseRequests] = useState<any>([]);

    function getPurchaseRequestOrders() {
        setTimeout( async () => {
            setDataPurchaseRequests(store_purchaserequest.data)  
            setLoading(false)
        }, 1000);
    }

    useEffect(() => {
        dispatch(getPurchaseRequestData())
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(!store_purchaserequest.loading) {
            getPurchaseRequestOrders()
        }
        // eslint-disable-next-line
    }, [store_purchaserequest.loading]);


    function onClickViewDetail (value : any) {
        history.push({
            pathname: "/dashboard/detail/purchase-requests",
            state : {
                data : value 
            }
        })
    }


    const columns: TableColumn<IDataRowPurchaseRequest>[] = [
        {
            name: 'NO',
            width: '70px',
            cell: (row, index) => (
                <p>{index + 1}</p>
            )
        },
        {
            name: 'CODE',
            selector: row => row.code_pr,
            width: '200px'

        },
        {
            name: 'DATE',
            cell: (row) => (
                <div>{moment(row.createdAt).format('ll')}</div>
            )
        },
        {
            name: 'AUTHOR',
            selector: row => row.createdBy,
        },
        {
            name: 'VENDOR',
            cell: (row) => (
                <div>
                    { row.vendors.length > 1 ? "Multi Vendor" : row.vendors[0].vendor_name }
                </div>
            ),
        },
        {
            name: 'TOTAL PRICE',
            cell: (row) => (
                <div>Rp. {row.total.toLocaleString()}</div>
            )
        },
        {
            name: 'STATUS',
            cell: (row) => (
                <Chip label={row.lastStatus} size="small" />
            ),
        },
        {
            name: 'ACTION',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Box onClick={() => onClickViewDetail(row) }>
                        <Button variant="contained" color="info" size="small">
                            View Detail
                        </Button>
                    </Box>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Purchase Requests Page"
            />
            <Stack direction="row" justifyContent="space-between" pt={3} >
                <Box>
                    <h2>Purchase Requests</h2>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <MenuPopOver
                        name="Create New PR From Template"
                        color="error"
                    />
                    <Box sx={{mr:2}} />
                    <Button 
                        variant="contained" color="primary"
                        href="/dashboard/create/purchase-requests"
                    >
                        Create New PR
                    </Button>
                </Box>
            </Stack>

            <Box sx={{pt:3}}>
                <DataTableBase 
                    columns={columns}
                    data={dataPurchaseRequests}
                    progressPending={loading}
                    pagination
                    noDataComponent="You dont have any Purchase Request Yet!"
                />
            </Box>
        </Box>
    )
}

export default PurchaseRequests;
