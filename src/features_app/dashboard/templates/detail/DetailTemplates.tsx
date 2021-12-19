import { useState } from 'react';
import { Box } from '@mui/system'
import BreadCrumbs from '../../../../components/BreadCrumbs'
import { 
    Stack, 
    Paper,
    Grid,
    Button,
    CircularProgress
} from '@mui/material';
import { useLocation, useHistory } from 'react-router';
import moment from 'moment';
import CardItemsTemplates from './CardItemsTemplates';
import axios from 'axios'
import swal from 'sweetalert'

const LBase = require("localbase");
const db: any = new LBase.default("db");
db.config.debug = false

function DetailTemplates() {
    const location = useLocation()
    const history = useHistory()
    
    const data_location : any = location.state

    // console.log(data_location, 'data location')
    const [loading, setLoading] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);

    const onClickUpdate = async (params:any) => {
        setLoading(true)
        try {
            const items : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/template/Items/${params._id}`)
            if(items.data.errors === null) {
                let data_items = items.data.data
                let result = await db.collection('db_local_template').set(data_items)
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

    const onClickCreatePR = async (params:any) => {
        setLoadingCreate(true)
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

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={true}
                page="Template Page"
                current="Detail Template"
                link="/dashboard/templates"
            />
            <Stack direction="row" justifyContent="space-between" pt={3} >
                <Box>
                    <h2>Detail Template</h2>
                </Box>
            </Stack>

            <Box sx={{pt:3}}>
                <Paper sx={{backgroundColor : '#092c4c', color: "#afc0c9", p: 2}} elevation={3}>
                    <Grid container spacing={2} justifyContent="space-between">
                        <Grid item>
                            <h3> Template Name : {data_location.data.name} </h3>
                            <h3> Created Date : {moment(data_location.data.createdAt).format("LL")} </h3>
                            <h3> Author : {data_location.data.createdBy} </h3>
                        </Grid>
                        <Grid item>
                            <Stack flexDirection="row">
                                <Box>
                                    <Button 
                                        variant="contained" color="info" size="small"
                                        onClick={() => onClickUpdate(data_location.data) }
                                    >
                                        { loading ? 
                                        <div className="loading-button"> 
                                            <p>Loading</p>  
                                            <CircularProgress size={20} color="inherit" />
                                        </div> : "Update Template"
                                    }
                                    </Button>
                                </Box>
                                <Box ml={2}>
                                    <Button 
                                        variant="contained" color="primary" size="small"
                                        onClick={() => onClickCreatePR(data_location.data) }
                                    >
                                        { loadingCreate ? 
                                        <div className="loading-button"> 
                                            <p>Loading</p>  
                                            <CircularProgress size={20} color="inherit" />
                                        </div> : "Create PR From Template"
                                    }
                                    </Button>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
               <CardItemsTemplates data={data_location.data.vendors} />
            </Box>

        </Box>
    )
}

export default DetailTemplates;
