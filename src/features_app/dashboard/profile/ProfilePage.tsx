import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import BreadCrumbs from '../../../components/BreadCrumbs'
import FormCompanyDetail from '../step_register/components/FormCompanyDetail'
import { getProfileCompany } from './reducers/profilesReducers'
// import {userCredentials} from './../../../utilities/config'

function ProfilePage() {

    const dispatch = useDispatch()
    const store_profile = useSelector((state : RootState) => state.profile)

    const [dataLegal, setDataLegal] = useState([]);

    // console.log(store_profile, 'store_profile')
    // console.log(dataLegal, 'dataLegal')

    useEffect(() => {
        dispatch(getProfileCompany())
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(store_profile.data.length !== 0) {
            let save_local = {
                category: { value: store_profile.data.category, label : store_profile.data.category },
                type : { value: store_profile.data.type, label : store_profile.data.type },
                legal_name : store_profile.data.legal_name,
                name : store_profile.data.name,
                address : store_profile.data.address,
                phone : store_profile.data.phone,
                whatsapp : store_profile.data.whatsapp,
                website : store_profile.data.website,
                instagram : store_profile.data.instagram,
                facebook : store_profile.data.facebook,
                twitter : store_profile.data.twitter
            }
            localStorage.setItem('company_detail', JSON.stringify(save_local))
            setDataLegal(store_profile.data.legal_docs)
        }
    }, [store_profile.data]);

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Profile Page"
            />
            <Box sx={{pt:2, pb:2}}>
                <h2>Profile Company</h2>
            </Box>
            <Paper elevation={3}>
                <Box p={3}>
                    <FormCompanyDetail
                        profile={true}
                    />
                </Box>
            </Paper>

            <Box sx={{pt:4, pb:2}}>
                <h2>Legal Documents</h2>
            </Box>

            <Paper elevation={3}>
                { store_profile.loading ? 
                <Box p={3}>
                    Loading...
                </Box> :
                <Box p={3}>
                    { dataLegal && dataLegal.map((data : any, index : any) => (
                        <Grid container key={index}>
                            <Grid item xl={2} lg={2} xs={12}>
                                <Box pt={2}><h4>{data.title}</h4></Box>
                            </Grid>
                            <Grid item xl={10} lg={10} xs={12}>
                                <Box pt={2}><h4>{data.value}</h4></Box>
                                <Box pt={2}>
                                    <img alt={data.title} src={data.url} style={{ width: 150, height: 150 }} />
                                </Box>
                            </Grid>
                        </Grid>
                    )) }
                </Box> }
            </Paper>
           
        </Box>
    )
}

export default ProfilePage
