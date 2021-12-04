import { useEffect } from 'react';
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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { registerAction } from './reducers/registerReducers';
import { UserFormSubmit } from './registerTypes'

const validationSchema = yup
  .object({
    email: yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    fullname: yup.string()
      .required("Full Name is required"),
    company_name: yup.string()
      .required("Company Name is required")
  })
  .required();


const Register = () => {
  const dispatch = useDispatch()
  const register_store = useSelector((state : RootState) => state.register )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UserFormSubmit>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema)
  });
  
  const onSubmit = (data: UserFormSubmit): void => {
    dispatch(registerAction(data))
  }


  /* istanbul ignore next */
  useEffect(() => {
    if(register_store.register) {
        reset()
    }
  }, [register_store.register, reset]);

  
  return (
    <>
      <Navbar/>
      <div className="container-height">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#39d059' }}>
              <ExitToAppIcon />
            </Avatar>

            <div >
              <h1>Register for Buyer</h1>
            </div>

            <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                error={!!errors.fullname}
                helperText={errors.fullname && errors.fullname.message}
                {...register('fullname', { required: true })}
                margin="normal"
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                autoComplete="fullname"
              />
              <TextField
                error={!!errors.company_name}
                helperText={errors.company_name && errors.company_name.message}
                {...register('company_name', { required: true })}
                margin="normal"
                fullWidth
                id="company_name"
                label="Legal Company Name"
                name="company_name"
                autoComplete="company_name"
              />
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
              />
              <TextField
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                {...register('password', { required: true })}
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
                Sign Up
                
                { /* istanbul ignore next */
                  register_store.loading && <CircularProgress  size={30} color="inherit" style={{marginLeft: 10}} /> }
              </Button>
              <Grid container justifyContent="space-between">
                <Grid item>
                  {"Already have an account? "}
                  <Link href="/">
                    Signin
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

export default Register;
