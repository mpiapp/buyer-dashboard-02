import {
    Avatar,
    Container,
    CssBaseline,
    Box,
    TextField,
    Button, 
    Grid, 
    Link,
    CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { sendEmail } from './forgotSlice';
import { UserFormSubmit } from './forgotTypes'

const validationSchema = yup
  .object({
    email: yup.string()
      .required("Email is required")
      .email("Email is invalid")
  })
  .required();


const Forgot = () => {

  const dispatch = useDispatch()
  const forgot = useSelector((state : RootState) => state.forgot)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormSubmit>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema)
  });
  

  const onSubmit = (data: UserFormSubmit): void => {
    dispatch(sendEmail(data))
  }

    return (
    <>
      <Navbar/>

      <div className="container-height">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#39d059' }}>
              <LockOutlinedIcon />
            </Avatar>
            
            <Box>
              <h1>Forgot Password?</h1>
              <p>Please enter your email to reset password</p>
            </Box>

            <Box sx={{ mt: 1, width: '100%' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
               error={!!errors.email}
               helperText={errors.email && errors.email.message}
               {...register('email', { required: true })}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-testid="submit-forgot"
              >
                Submit
                {
                  /* istanbul ignore next */
                  forgot.loading && <CircularProgress  size={30} color="inherit" style={{marginLeft: 10}} /> 
                }
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/">
                    Back to Sign In
                  </Link>
                </Grid>
              </Grid>
            </form>
            </Box>
          </Box>
        </Container>
      </div>
      <Footer/>
    </>
    )
}

export default Forgot;
