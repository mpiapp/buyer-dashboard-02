import { Button, Grid, Stack } from '@mui/material'
import { Box } from '@mui/system'
import MenuPopOver from '../../../components/MenuPopOver'
import {userCredentials} from './../../../utilities/config'
import CardStatistic from './components/CardStatistic'
// import NewestOrders from './components/NewestOrders'
import { Link } from 'react-router-dom'
const username = userCredentials === null ? "" : userCredentials.fullname

function HomeDashboard() {
    
    // console.log(userCredentials, 'userrr')

    return (
        <Box sx={{pl:3, pr:3, pt:2}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <h2>Welcome back, {username}</h2>
                    <Box fontWeight="400">PT Manajemen Pemasaran Indonesia</Box>
                </Box>
                <Box sx={{display: 'flex'}}>
                    <Link to="/dashboard/create/purchase-requests">
                        <Button variant="contained" color="primary" >
                            Create New PR
                        </Button>
                    </Link>
                    <Box sx={{mr:2}} />
                    <MenuPopOver
                        name="Create New PR From Template"
                        color="error"
                    />
                </Box>
            </Stack>
            <Stack sx={{pt:3}} >
                <Grid container spacing={3}>
                    <Grid item xl={3} lg={3} sm={6} xs={12}>
                        <CardStatistic 
                            label="Account Payable"
                            value={250000000}
                            currency={true}
                            background="#cccccc"
                        />
                    </Grid>
                    <Grid item xl={3} lg={3} sm={6} xs={12}>
                        <CardStatistic 
                            label="Total Purchases"
                            value={56000000}
                            currency={true}
                            background="#cccccc"
                        />
                    </Grid>
                    <Grid item xl={3} lg={3} sm={6} xs={12}>
                        <CardStatistic 
                            label="Active PR"
                            value={23}
                            currency={false}
                            background="#cccccc"
                        />
                    </Grid>
                    <Grid item xl={3} lg={3} sm={6} xs={12}>
                        <CardStatistic 
                            label="Active PO"
                            value={4}
                            currency={false}
                            background="#cccccc"
                        />
                    </Grid>
                </Grid>
            </Stack>

            {/* <Stack sx={{pt:5}} >
                <Grid container spacing={4}>
                    <Grid item xl={8} lg={8} sm={6} xs={12}>
                        <NewestOrders />
                    </Grid>
                    <Grid item xl={4} lg={4} sm={6} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xl={12} lg={12} sm={12} xs={12}>
                                <Box fontWeight="500" fontSize={25}>
                                    Status Orders
                                </Box>
                            </Grid>
                            <Grid item xl={6} lg={6} sm={6} xs={12}>
                                <CardStatistic 
                                    label="New Orders"
                                    value={0}
                                    currency={false}
                                    background="#7a6fd2"
                                    status={true}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} sm={6} xs={12}>
                                <CardStatistic 
                                    label="Pick & Pack"
                                    value={20}
                                    currency={false}
                                    background="#7fbbcc"
                                    status={true}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} sm={6} xs={12}>
                                <CardStatistic 
                                    label="Ready to Ship"
                                    value={15}
                                    currency={false}
                                    background="#5276fe"
                                    status={true}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} sm={6} xs={12}>
                                <CardStatistic 
                                    label="Shipped"
                                    value={45}
                                    currency={false}
                                    background="#5aa2d3"
                                    status={true}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} sm={6} xs={12}>
                                <CardStatistic 
                                    label="Delivered"
                                    value={40}
                                    currency={false}
                                    background="#43ce81"
                                    status={true}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} sm={6} xs={12}>
                                <CardStatistic 
                                    label="Pending"
                                    value={0}
                                    currency={false}
                                    background="#ffc866"
                                    status={true}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack> */}
        </Box>
    )
}

export default HomeDashboard
