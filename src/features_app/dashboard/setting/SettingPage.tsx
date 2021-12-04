import { Box } from '@mui/system'
import BreadCrumbs from '../../../components/BreadCrumbs'
// import {userCredentials} from './../../../utilities/config'

function SettingPage() {

    // console.log(userCredentials, 'userrr')

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Setting Page"
            />
           <Box sx={{pt:2}}>
                <h3>Setting page is cooming soon...</h3>
           </Box>
        </Box>
    )
}

export default SettingPage
