// import { Button, CircularProgress, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import BreadCrumbs from '../../../components/BreadCrumbs'
// import {userCredentials} from './../../../utilities/config'

function BuyerLists() {

    // console.log(userCredentials, 'userrr')

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Prefered Buyer Lists"
            />
           <Box sx={{pt:2}}>
                <h2>Prefered Buyer Lists is coming soon...</h2>
           </Box>

           
        </Box>
    )
}

export default BuyerLists
