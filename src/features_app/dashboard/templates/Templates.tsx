import { useEffect, useState } from 'react';
import { Stack, Button, CircularProgress } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { Box } from '@mui/system'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { TableColumn } from 'react-data-table-component';
import DataTableBase from '../../../components/TableData';
// import { IDataRowTemplates } from './templateTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { getTemplatesData, removeTemplatesData } from './reducers/templatesReducers';
import moment from 'moment';
import axios from 'axios'
import swal from 'sweetalert'

const LBase = require("localbase");
const db: any = new LBase.default("db");
db.config.debug = false

function Templates() {

    const history = useHistory()
    const dispatch = useDispatch()
    const store_templates = useSelector((state : RootState) => state.template)

    // console.log(store_templates, 'store template')

    const [loading, setLoading] = useState(true);
    const [indexPurchaseRequest, setIndexPurchaseRequest] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState({
        index : null,
        loading : false,
        loading_create : false
    });
    const [dataTemplates, setDataTemplates] = useState<any>([]);

    function processTempates() {
        setTimeout( async () => {
            setDataTemplates(store_templates.data)  
            setLoading(false)
        }, 1000);
    }

    useEffect(() => {
        dispatch(getTemplatesData())
         // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(!store_templates.loading) {
            processTempates()
        }
        // eslint-disable-next-line
    }, [store_templates.loading]);

    useEffect(() => {
        if(store_templates.remove) {
            setLoading(true)
            dispatch(getTemplatesData())
        }
        // eslint-disable-next-line
    }, [store_templates.remove]);

    const onClickRemove = (row : any, i : any) => {
        dispatch(removeTemplatesData(row._id))
        setIndexPurchaseRequest(i)
    }


    const onClickUpdate = async (params:any, i : any) => {
        setLoadingUpdate({...loadingUpdate, index : i, loading: true })
        try {
            const items : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/template/Items/${params._id}`)
            if(items.data.errors === null) {
                let vendor = items.data.data
                let result = await db.collection('db_local_template').set(vendor)
                if(result) {
                    history.push({
                        pathname: "/dashboard/create/template",
                        state : {
                            data : params 
                        }
                    })
                }
            } else {
                swal('Error', `${items.data.message}`, 'error')
            }
          } catch (error) {
              swal('Error', `${error}`, 'error')
          }
    }

    const onClickCreatePR = async (params:any, i : any) => {
        setLoadingUpdate({...loadingUpdate, index : i, loading_create: true })
        try {
            const items : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/template/Items/${params._id}`)
            if(items.data.errors === null) {
                let data_items = items.data.data
                let result = await db.collection('db_local_CART').set(data_items)
                if(result) {
                    history.push({
                        pathname: "/dashboard/create/purchase-requests",
                        state : {
                            data : params 
                        }
                    })
                }
            } else {
                swal('Error', `${items.data.message}`, 'error')
            }
          } catch (error) {
              swal('Error', `${error}`, 'error')
          }
    }

    function onClickViewDetail (value : any) {
        history.push({
            pathname: "/dashboard/detail/template",
            state : {
                data : value 
            }
        })
    }

    const columns: TableColumn<any>[] = [
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
            cell: (row) => (
                moment(row.createdAt).format("lll")
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
                <div>Rp. {parseInt(row.total).toLocaleString()}</div>
            )
        },
        {
            name: 'ACTION',
            width: '400px',
            cell: (row, i) => (
                <Stack direction="row" spacing={2}>
                    <Box onClick={() => onClickViewDetail(row) }>
                        <Button 
                            variant="outlined" color="info" size="small" 
                            fullWidth
                        >
                            Detail
                        </Button>
                    </Box>
                    <Box>
                        <Button 
                            variant="outlined" color="primary" size="small"
                            onClick={() => onClickUpdate(row, i) }
                        >
                            { loadingUpdate.index === i && loadingUpdate.loading ? 
                            <div className="loading-button"> 
                                <p>Loading</p>  
                                <CircularProgress size={20} color="inherit" />
                            </div> : "Update PR"
                        }
                        </Button>
                    </Box>
                    <Box onClick={() => onClickRemove(row, i) }>
                        <Button variant="outlined" color="error" size="small" fullWidth>
                            { indexPurchaseRequest === i && store_templates.loading_remove ? 
                            <div className="loading-button"> 
                                {/* <p>Loading</p>   */}
                                <CircularProgress size={20} color="inherit" />
                            </div> : "Delete"
                            }
                        </Button>
                    </Box> 
                    <Box ml={2}>
                        <Button 
                            variant="contained" color="info" size="small"
                            onClick={() => onClickCreatePR(row, i) }
                        >
                            { indexPurchaseRequest === i && loadingUpdate.loading_create ? 
                            <div className="loading-button"> 
                                {/* <p>Loading</p>   */}
                                <CircularProgress size={20} color="inherit" />
                            </div> : "Create PR"
                        }
                        </Button>
                    </Box>
                </Stack>
            ),
        },
    ];

    return (
        <Stack pt={2} pl={3} pr={3}>
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

            <Stack pt={3}>
                <DataTableBase 
                    columns={columns}
                    data={dataTemplates}
                    progressPending={loading}
                />
            </Stack>
        </Stack>
    )
}

export default Templates;
