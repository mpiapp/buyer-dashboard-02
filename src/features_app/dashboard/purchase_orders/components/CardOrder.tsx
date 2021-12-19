import React, { useState, useEffect } from 'react'
import { 
    Box, 
    Paper, 
    Grid, 
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tabs,
    Tab,
    Badge,
    Stack,
    Dialog, 
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableItem from './TableItem';
import moment from 'moment'
import UploadProof from './UploadProof';
import { userCredentials } from '../../../../utilities/config';
import { useDispatch, useSelector } from 'react-redux';
import { postProofDownPayment } from '../reducers/purchaseOrdersReducers';
import { RootState } from '../../../../app/store';
import swal from 'sweetalert'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    // console.log(value, index, 'ini apa')
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Box>{children}</Box>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  

const CardOrder : React.FC<any> = ({ data }) => {

    const store_purchaseorders = useSelector((state : RootState) => state.purchase_orders)

    // console.log(data, 'store_purchaseorders pacackage')

    const dispatch = useDispatch()

    const [value, setValue] = useState(0);

    const [open, setOpen] = useState(false);
    const [dataImage, setDataImage] = useState("");
    const [codePO, setCodePO] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDataImage("")
        setLoading(false)
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // console.log(newValue, 'new value')
        // console.log(event, 'event')
        setValue(newValue);
    };

    function getPackageActive(data:any) {
        let data_package = data.filter((key : any) => key.lastStatus === "New")
        return data_package
    }

    function getPackagePickPack(data:any) {
        let data_package = data.filter((key : any) => key.lastStatus === "Pick")
        return data_package
    }

    function getPackageRTS(data:any) {
        let data_package = data.filter((key : any) => key.lastStatus === "Ready to Ship")
        return data_package
    }

    function getPackageShipped(data:any) {
        let data_package = data.filter((key : any) => key.lastStatus === "Shipped")
        return data_package
    }

    function getPackageDelivered(data:any) {
        let data_package = data.filter((key : any) => key.lastStatus === "Delivered")
        return data_package
    }


    const onClickSubmit = () => {
        if(dataImage !== "") {
            const body = {
                "id": codePO,
                "fileUrl": dataImage,
                "uploader": userCredentials.fullname
            }
            dispatch(postProofDownPayment(body))
        }
    }

    useEffect(() => {
        if(store_purchaseorders.proof) {
            handleClose()
            swal('Success', "Success upload image proof, Please waiting vendor to confirmation.", 'success')
            setTimeout(() => {
                window.location.reload()
            }, 2500);
        }
    }, [store_purchaseorders.proof]);

    function getStyle (val : any) {
        return val === value ? 'white' : 'black'
    }

    function BadgeLabel ({name, total, index} : any) {
        return (
          <Badge 
            color="error" 
            badgeContent={total === 0 ? '0' : total}  
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={{ mr: 1, color: getStyle(index) }}>{name}</Box>
          </Badge>
        )
    }

    // console.log(data, 'data')

    // const returnIndex = (i: any, number : number) => {
    //     // let numb = `${1}${number}`
    //     let numb = `${1}${number}`
    //     console.log(parseInt(numb), 'parse')
    //     return parseInt(numb)
    // }

    return (
    <Stack>
        <div>
            { data?.map((val : any, i : any) => (
                <Box mb={4} mt={4} key={i} >
                    <Paper elevation={2}>
                        <Paper>
                            <Grid container spacing={2} justifyContent="space-between">
                                <Grid item>
                                    <Box fontWeight="bold" pl={2}> Order ID : {val.code_po}</Box>
                                    <Box fontWeight="normal" pl={2} fontSize={13}> Date : {moment(val.date).format('ll')}</Box>
                                </Grid>
                                { val.lastStatus === "Waiting Down Payment" &&
                                <Grid item>
                                   <Box pr={2}>
                                    <Button 
                                        size="small" color="error" variant="outlined"
                                        onClick={() => {
                                            setCodePO(val._id)
                                            handleClickOpen()
                                        }}
                                    >
                                        Upload Proof DP
                                    </Button> 
                                   </Box>
                                </Grid>
                                }
                            </Grid>
                        </Paper>
                        <Box p={2}>
                            <Grid container spacing={3} >
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                    <Box fontWeight="bold" style={{display:'flex', alignItems: 'center'}}>
                                        <Box pr={1}>{val.vendor.name} </Box>
                                        <Button size="small" color="primary" variant="outlined">
                                            Message
                                        </Button>
                                    </Box> 
                                    <Box pt={1} fontWeight="normal" fontSize={14}>
                                        <Box style={{width: '80%'}}>{val.vendor.phone}</Box>
                                        <Box style={{width: '80%'}}>{val.vendor.address}</Box>
                                    </Box>
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                    <Box fontWeight="bold" pt={1}> 
                                        Total Price : Rp. {(val.grand_total).toLocaleString()}
                                    </Box>
                                    <Box fontWeight="bold" pt={1}> Down Payment : Rp. {(val.down_payment === null ? 0 : val.down_payment).toLocaleString()}</Box>
                                    <Box fontWeight="bold" pt={1}> Total Package : {val?.packages?.length}</Box>
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
                                            Detail All Packages ({val.packages?.length})
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#26b99a'}}>
                                                <Tabs TabIndicatorProps={{style: {background:'white' }}} value={value} onChange={handleChange} aria-label="basic tabs example" color="error">
                                                    <Tab label={<BadgeLabel name="Active" total={getPackageActive(val.packages).length} index={0} />} {...a11yProps(0)} />
                                                    <Tab label={<BadgeLabel name="Pick & Pack" total={getPackagePickPack(val.packages).length} index={1} />} {...a11yProps(1)} />
                                                    <Tab label={<BadgeLabel name="Ready to Ship" total={getPackageRTS(val.packages).length} index={2} />} {...a11yProps(2)} />
                                                    <Tab label={<BadgeLabel name="Shipped" total={getPackageShipped(val.packages).length} index={3} />} {...a11yProps(3)} />
                                                    <Tab label={<BadgeLabel name="Delivered" total={getPackageDelivered(val.packages).length} index={4} />} {...a11yProps(4)} />
                                                </Tabs>
                                            </Box>
                                            <Paper style={{ backgroundColor: '#ddd' }}>
                                                <TabPanel value={value}  index={0} >
                                                    <TableItem 
                                                        data={getPackageActive(val.packages)}  
                                                        status="Active"
                                                    /> 
                                                </TabPanel>
                                                <TabPanel value={value} index={1}>  
                                                    <TableItem 
                                                       data={getPackagePickPack(val.packages)} 
                                                       status="Pick" 
                                                    /> 
                                                </TabPanel>
                                                <TabPanel value={value} index={2} >
                                                    <TableItem 
                                                        data={getPackageRTS(val.packages)} 
                                                        status="Ready To Ship"
                                                    /> 
                                                </TabPanel>
                                                <TabPanel value={value} index={3}> 
                                                    <TableItem 
                                                        data={getPackageShipped(val.packages)} 
                                                        status="Shipped"
                                                        dataOrders={val}
                                                    /> 
                                                </TabPanel>
                                                <TabPanel value={value} index={4} >
                                                    <TableItem 
                                                        data={getPackageDelivered(val.packages)} 
                                                        status="Delivered"
                                                    /> 
                                                </TabPanel>
                                            </Paper>
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

        {/* DIALOG UPLOAD PRROF */}
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title">
                {"Upload Proof Down Payment"}
            </DialogTitle>
            <DialogContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <UploadProof 
                        setDataImage={setDataImage}
                        dataImage={dataImage}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" color="error">Close</Button>
                <Button onClick={() => onClickSubmit()} variant="contained" color="primary">
                    { store_purchaseorders.loading_proof ? 
                        <div>Loading.. <CircularProgress size={20} color="inherit"/> </div> :
                        "Submit"
                    }
                </Button>
            </DialogActions>
        </Dialog>
    </Stack>
    )
}

export default CardOrder
