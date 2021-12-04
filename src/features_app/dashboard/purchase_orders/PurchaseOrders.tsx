import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { 
    Tabs,
    Tab,
    Paper,
    Badge
} from '@mui/material';
import CardOrder from './CardOrder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { getPurchaseOrdersData } from './reducers/purchaseOrdersReducers';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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


const PurchaseOrders = () => {
    const dispatch = useDispatch()
    const store_purchaseorders = useSelector((state : RootState) => state.purchase_orders)


    const [value, setValue] = React.useState(0);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dataPurchaseOrders, setDataPurchaseOrders] = useState<any[]>([]);


    function getPRDownPayment(data:any) {
      let data_downpaymnt = data.filter((key : any) => key.lastStatus === "Waiting Down Payment")
      return data_downpaymnt
    }

    function getPRActive(data:any) {
        let data_active = data.filter((key : any) => key.lastStatus === "Active")
        return data_active
    }

    function getPRCompleted(data:any) {
      let data_completed = data.filter((key : any) => key.lastStatus === "Completed")
      return data_completed
  }

    function getPurchaseRequest() {
      setDataPurchaseOrders(store_purchaseorders.data)
      setLoaded(true)
      setLoading(false)
    }

    useEffect(() => {
        dispatch(getPurchaseOrdersData()) 
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(store_purchaseorders.data) {
          getPurchaseRequest()
        }
        // eslint-disable-next-line
    }, [store_purchaseorders.data]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function getStyle (val : any) {
      return val === value ? 'white' : '#000'
  }

    function BadgeLabel ({name, total, index} : any) {
        return (
          <Badge 
            color="error" 
            badgeContent={total === 0 ? '0' : total}  
          >
            <Box sx={{ mr: 1, color: getStyle(index) }}>{name}</Box>
          </Badge>
        )
    }   

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Purchase Orders Page"
            />
           <Box sx={{pt:2}}>
                <h2>Purchase Orders</h2>
           </Box>

           <Box sx={{ width: '100%', mt: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#39d059'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" color="error">
                        <Tab label={<BadgeLabel name="Waiting Down Payment" total={getPRDownPayment(dataPurchaseOrders).length} index={0} /> } {...a11yProps(0)} />
                        <Tab label={<BadgeLabel name="Active" total={getPRActive(dataPurchaseOrders).length} index={1} /> } {...a11yProps(1)} />
                        <Tab label={<BadgeLabel name="Completed" total={getPRCompleted(dataPurchaseOrders).length} index={2} />} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <Paper style={{ backgroundColor: '#ddd' }}>
                  <TabPanel value={value} index={0} >
                    { loading ? "Loading..." :
                    <>
                      { loaded && 
                        <Box>
                          { getPRDownPayment(dataPurchaseOrders).length === 0 ? "You dont have any down payment orders yet!" : 
                            <CardOrder data={getPRDownPayment(dataPurchaseOrders)} />
                          }
                        </Box>
                      }
                      </>
                    }
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    { loading ? "Loading..." :
                      <>
                      { loaded && 
                        <Box>
                          { getPRActive(dataPurchaseOrders).length === 0 ? "You dont have any active orders yet!" : 
                            <CardOrder data={getPRActive(dataPurchaseOrders)} />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    { loading ? "Loading..." :
                      <>
                      { loaded && 
                        <Box>
                          { getPRCompleted(dataPurchaseOrders).length === 0 ? "You dont have any completed orders yet!" : 
                            <CardOrder data={getPRCompleted(dataPurchaseOrders)} />
                          }
                        </Box> 
                      }
                      </>
                    }
                  </TabPanel>
                </Paper>
           </Box>
        </Box>
    )
}

export default PurchaseOrders;
