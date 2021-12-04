import { Button, Paper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import BreadCrumbs from '../../../components/BreadCrumbs'
import {userCredentials} from './../../../utilities/config'

const username = userCredentials === null ? "" : userCredentials.fullname
const email = userCredentials === null ? "" : userCredentials.email

function AccountPage() {

    // console.log(userCredentials, 'userrr')

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={false}
                current="Setting Page"
            />
           <Box sx={{pt:2}}>
                <h2>Account Setting</h2>
           </Box>

           <Box sx={{pt:2, width: '50%'}}>
                <Paper elevation={3}>
                    <Box p={3}>
                    <form>
                        <TextField
                            // error={!!errors.fullname}
                            // helperText={errors.fullname && errors.fullname.message}
                            // {...register('fullname', { required: true })}
                            defaultValue={username}
                            margin="normal"
                            fullWidth
                            id="fullname"
                            label="Full Name"
                            name="fullname"
                            autoComplete="fullname"
                        />
                        <TextField
                            // error={!!errors.email}
                            // helperText={errors.email && errors.email.message}
                            // {...register('email', { required: true })}
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            defaultValue={email}
                            disabled
                        />
                        <TextField
                            // error={!!errors.email}
                            // helperText={errors.email && errors.email.message}
                            // {...register('email', { required: true })}
                            margin="normal"
                            fullWidth
                            id="role"
                            label="Role"
                            name="role"
                            autoComplete="role"
                            defaultValue="Owner"
                            disabled
                        />
                        <TextField
                            // error={!!errors.password}
                            // helperText={errors.password && errors.password.message}
                            // {...register('password', { required: true })}
                            defaultValue="arissurya"
                            disabled
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="medium"
                        >
                            Save Change
                            
                            {/* { register_store.loading && <CircularProgress  size={30} color="inherit" style={{marginLeft: 10}} /> } */}
                        </Button>
                    </form>
                    </Box>
                </Paper>
           </Box>
        </Box>
    )
}

export default AccountPage
