import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import BreadCrumbs from '../../../components/BreadCrumbs'
import FormCompanyDetail from '../step_register/components/FormCompanyDetail'
import FormLegalDocument from '../step_register/components/FormLegalDocument'
// import {userCredentials} from './../../../utilities/config'

function ProfilePage() {

    // console.log(userCredentials, 'userrr')

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
                <Box p={3}>
                    <FormLegalDocument
                        profile={true}
                    />
                </Box>
            </Paper>
           
        </Box>
    )
}

export default ProfilePage
