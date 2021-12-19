import { useState, useEffect } from 'react';
import { Box } from '@mui/system'
import BreadCrumbs from '../../../../components/BreadCrumbs'
import { 
    Stack, 
    Paper, 
    Grid, 
    TextField, 
    Button,
    Dialog, 
    DialogActions,
    DialogContent,
    DialogTitle ,
    CircularProgress
} from '@mui/material';
import { useLocation } from 'react-router';
import CardItems from './CardItems';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { approvePurchaseRequests, rejectPurchaseRequests } from './reducers/detailPurchaseRequestReducers';
import { userCredentials } from '../../../../utilities/config';
import { TableColumn } from 'react-data-table-component';
import DataTableBase from '../../../../components/TableData';
import { RootState } from '../../../../app/store';


function DetailPurchaseRequests() {
    const dispatch = useDispatch()
    const location = useLocation()
    const data_location : any = location.state

    // console.log(data_location, 'data locations')

    const approve_store = useSelector((store : RootState) => store.approve_po) 

    const [note, setNote] = useState("");
    const [open, setOpen] = useState(false);
    const [errorNote, setErrorNote] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if(approve_store.approve) {
            setTimeout(() => {
                window.location.href = "/dashboard/purchase-requests"
            }, 1500);
        } 
    }, [approve_store.approve]);

    const onClickApprove = (val : string) => {
        if(note === "") {
            setErrorNote(true)
        } else {
            const data_send = {
                name : userCredentials.fullname,
                id : val,
                note : note,
                lastStatus : data_location.lastStatus
            }
            dispatch(approvePurchaseRequests(data_send))
        }
    }

    const onClickReject = (val : string) => {
        if(note === "") {
            setErrorNote(true)
        } else {
            const data_send = {
                name : userCredentials.fullname,
                id : val,
                note : note,
                lastStatus : data_location.lastStatus
            }
            dispatch(rejectPurchaseRequests(data_send))
        }
    }



    const columns: TableColumn<any>[] = [
        {
            name: 'NO',
            width: '60px',
            cell: (row, index) => (
                <p>{index + 1}</p>
            )
        },
        {
            name: 'DATE',
            width: '200px',
            cell: (row) => (
                <div>{moment(row.timestamp).format('lll')}</div>
            )
        },
        {
            name: 'STATUS',
            selector: row => row.name,
            width: '120px'
        },
        {
            name: 'NAME',
            selector: row => row.user,
            width: '120px'
        },
        
        {
            name: 'NOTE',
            selector: row => row.note,
            width: '240px'
        },
        
    ];

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={true}
                page="Purchase Requests Page"
                current="Detail Purchase Request"
                link="/dashboard/purchase-requests"
            />
            <Stack direction="row" justifyContent="space-between" pt={3} >
                <Box>
                    <h2>Detail Purchase Requests</h2>
                </Box>
            </Stack>

            <Box sx={{pt:3}}>
                <Paper sx={{backgroundColor : '#092c4c', color: "#afc0c9", p: 2}} elevation={3}>
                    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <h3> Code PR : {data_location.data.code_pr} </h3>
                            <h3> Date : {moment(data_location.data.date).format("LL")} </h3>
                            <h3> Author : {data_location.data.createdBy} </h3>
                            <h3> Status : {data_location.data.lastStatus} </h3>
                        </Grid>
                        { data_location.data.lastStatus !== "Submit" ? 
                        <Grid item>
                            <Paper>
                                <Box p={2}>
                                    Status : {data_location.data.lastStatus}
                                </Box>
                            </Paper>
                            <Box mt={2}>
                                <Button 
                                    size="small" 
                                    variant="contained" 
                                    color="error"
                                    onClick={handleClickOpen}
                                
                                >View History</Button>
                            </Box>
                        </Grid> :
                        <Grid item>
                            <Box style={{ minWidth: 400 }}>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={3}
                                    placeholder="Note"
                                    color="success"
                                    style={{backgroundColor: '#fff'}}
                                    fullWidth
                                    onChange={(e) => {
                                        setErrorNote(false)
                                        setNote(e.target.value)
                                    }}
                                />
                            </Box>
                            { errorNote && <Box sx={{ color: 'red', pt: 1 }} >Note is required!</Box> }
                            <Stack flexDirection="row" sx={{mt:1}}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={() => onClickApprove(data_location.data._id)}
                                >
                                    { approve_store.loading_approved ? 
                                        <div className="loading-button"> 
                                        <p>Loading</p>  
                                        <CircularProgress size={20} color="inherit" />
                                        </div> : "Approve" 
                                    } 
                                </Button>
                                <Box mr={1} />
                                <Button 
                                    variant="contained" 
                                    color="error"
                                    onClick={() => onClickReject(data_location.data._id)}
                                > 
                                    { approve_store.loading_reject ? 
                                        <div className="loading-button"> 
                                        <p>Loading</p>  
                                        <CircularProgress size={20} color="inherit"/>
                                        </div> : "Reject" 
                                    }  
                                </Button>
                            </Stack>
                        </Grid> }
                    </Grid>
                </Paper>
               <CardItems data={data_location.data.vendors} />
            </Box>

            {/* DIALOG OPEN HISTORY */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
            >
                <DialogTitle id="alert-dialog-title">
                    {"History Purchase Requests"}
                </DialogTitle>
                <DialogContent>
                    <DataTableBase 
                        columns={columns}
                        data={data_location.data.statuses}
                    /> 
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DetailPurchaseRequests;
