import { useState, useEffect } from 'react'; 
import { Box } from '@mui/system'
import { Button, Stack, CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom';
import BreadCrumbs from '../../../components/BreadCrumbs'
import { TableColumn } from 'react-data-table-component';
import DataTableBase from '../../../components/TableData';
import { IDataRowPurchaseRequest } from './purchaseRequestTypes';
import MenuPopOver from '../../../components/MenuPopOver';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseRequestData, removePurchaseRequestData } from './reducers/purchaseRequestReducers';
import { RootState } from '../../../app/store';
import moment from 'moment'
import axios from 'axios'
import swal from 'sweetalert'

const LBase = require("localbase");
const db: any = new LBase.default("db");
db.config.debug = false

const PurchaseRequests = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const store_purchaserequest = useSelector((state : RootState) => state.purchase_request)

    const [loading, setLoading] = useState(true);
    const [indexPurchaseRequest, setIndexPurchaseRequest] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState({
        index : null,
        loading : false
    });
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

    useEffect(() => {
        if(store_purchaserequest.remove) {
            setLoading(true)
            dispatch(getPurchaseRequestData())
        }
        // eslint-disable-next-line
    }, [store_purchaserequest.remove]);


    function onClickViewDetail (value : any) {
        history.push({
            pathname: "/dashboard/detail/purchase-requests",
            state : {
                data : value 
            }
        })
    }

    const onClickUpdate = async (params:any, i : any) => {
        setLoadingUpdate({...loadingUpdate, index : i, loading: true })
        try {
            const items : any = await axios.get(`${process.env.REACT_APP_API_HOST}/purchase-request/Items/${params._id}`)
            if(items.data.errors === null) {
                let vendor = items.data.data
                let result = await db.collection('db_local_CART').set(vendor)
                if(result) {
                    history.push({
                        pathname: "/dashboard/create/purchase-requests",
                        state : {
                            name : "Update"
                        }
                    })
                }
                let id_cart_pr = {
                    saved: true,
                    change: false,
                    id : params._id
                }
                localStorage.setItem('id_cart_pr', JSON.stringify(id_cart_pr))
            } else {
                swal('Error', `${items.data.message}`, 'error')
            }
          } catch (error) {
              swal('Error', `${error}`, 'error')
          }
    }

    const onClickRemove = (row : any, i : any) => {
        dispatch(removePurchaseRequestData(row._id))
        setIndexPurchaseRequest(i)
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
                    { row.vendors.length > 1 ? "Multi Vendor" : row.vendors[0].vendor.name }
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
            width: '250px',
            cell: (row, i) => (
                <Stack direction="row" spacing={3}>
                    { row.lastStatus === 'Open' ? 
                    <Box onClick={() => onClickUpdate(row, i) }>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            fullWidth
                        >
                        { loadingUpdate.index === i && loadingUpdate.loading ? 
                            <div className="loading-button"> 
                                <p>Loading</p>  
                                <CircularProgress size={20} color="inherit" />
                            </div> : "Update PR"
                        }
                        </Button>
                    </Box> :
                    <Box onClick={() => onClickViewDetail(row) }>
                        <Button 
                            variant="contained" 
                            color="info" 
                            size="small" 
                            fullWidth
                        >
                            View Detail
                        </Button>
                    </Box> }
                    { row.lastStatus === "Open" || row.lastStatus === "Submit"  ? 
                    <Box onClick={() => onClickRemove(row, i) }>
                        <Button 
                            variant="outlined" 
                            color="error" 
                            size="small" 
                            fullWidth
                        >
                            { indexPurchaseRequest === i && store_purchaserequest.loading_remove ? 
                            <div className="loading-button"> 
                                <CircularProgress size={20} color="inherit" />
                            </div> : "Delete"
                            }
                        </Button>
                    </Box> : null }
                </Stack>
            ),
        },
    ];

    return (
        <Stack pt={2} pl={3} pr={3}>
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
                    <Box mr={2} />
                    <Button 
                        variant="contained" color="primary"
                        href="/dashboard/create/purchase-requests"
                    >
                        Create New PR
                    </Button>
                </Box>
            </Stack>

            <Stack pt={3}>
                <DataTableBase 
                    columns={columns}
                    data={dataPurchaseRequests}
                    progressPending={loading}
                    pagination
                    noDataComponent="You dont have any Purchase Request Yet!"
                />
            </Stack>
        </Stack>
    )
}

export default PurchaseRequests;
