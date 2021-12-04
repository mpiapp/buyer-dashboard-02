import { Box } from '@mui/material'
import StepperForm from './components/StepperForm'
import {userCredentials} from './../../../utilities/config'

function StepRegister() {

    // console.log(userCredentials, 'userrr')

    return (
        <div>
           <div className="section-top">
                <h2>Welcome {userCredentials.fullname}</h2>
                <p>Please fill these form to complete the registration.</p>
           </div>
           <div className="section-form-stepper">
                <Box p={3}>
                    <StepperForm/>
                </Box>
           </div>
        </div>
    )
}

export default StepRegister
