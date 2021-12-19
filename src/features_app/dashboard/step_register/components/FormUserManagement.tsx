import React, { useState, useEffect } from 'react'
import {
    Button,
    Grid,
    Box,
    TextField,
    Backdrop,
    CircularProgress 
} from '@mui/material';
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IUserManagement } from '../stepRegisterTypes'
import { ISelectOption } from '../../globalTypes'
import { changeStep } from './stepFormSlice';
import swal from 'sweetalert';
import axios from 'axios'
import { defaulCompanyDetail } from '../stepRegisterSlice';
import { userCredentials } from '../../../../utilities/config';
import { postAddUserManagement } from '../reducers/stepRegisterReducers';
import { RootState } from '../../../../app/store';
import crypto from 'crypto-js'; 

const validationSchema = yup
  .object({
    fullname: yup.string()
      .required("Fullname is required"),
    email: yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
  })
  .required();

const FormUserManagement : React.FC<any> = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<IUserManagement>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const dispatch = useDispatch()
    const state_stepregister = useSelector((state : RootState) => state.step_register)

    // state for category company
    const [optionsRoles, setOptionsRoles] = useState<ISelectOption[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<any>([]);
    const [errorRoles] = useState<boolean>(false);

     /* istanbul ignore next */
     const handleChangeRoles = (value: any) : void => {
        setSelectedRoles(value)
    }


    const onSubmit = (data: IUserManagement): void => {
        let dataUser = {
            user_email: data.email,
            user_password : data.password,
            user_name : data.fullname,
            buyer_id: userCredentials.buyer_id,
            company_code: userCredentials.company_code,
            role_id: selectedRoles.value

        }
        dispatch(postAddUserManagement(dataUser))
    }

    const getMasterRoles = async () => {
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/master/roles?flag=BUYER`)
            if(response.data.errors === null) {
                let roles = response.data.data
                let array_roles = []
                for(let element of roles) {
                    array_roles.push({
                        label : element.name,
                        value : element._id
                    })
                }
                setOptionsRoles(array_roles)
            } else {
                swal('Error', `${response.data.message}`, 'error')
            }
            
        } catch (error) {
            swal('Error', `${error}`, 'error')
        }
    }

    useEffect(() => {
        getMasterRoles()
    }, []);

    useEffect(() => {
        if(state_stepregister.user) {
            let data = {
                access_token : userCredentials.access_token,
                id_token : userCredentials.id_token, 
                expires_in : userCredentials.expires_in,
                email :userCredentials.email,
                fullname :userCredentials.fullname, 
                role :userCredentials.role, 
                avatar :userCredentials.avatar,
                auth_id :userCredentials.auth_id,
                first_time : false,
                buyer_id :userCredentials.buyer_id,
                company_code :userCredentials.company_code,
                buyer_name :userCredentials.buyer_name,
                login: true
            }
            const saveToLocalStorage = crypto.AES.encrypt(JSON.stringify(data), `${process.env.REACT_APP_CRYPTO_SECRET}`).toString();
            localStorage.setItem('_?credentials', saveToLocalStorage)
            window.location.href = "/dashboard"
        }
        // eslint-disable-next-line
    }, [state_stepregister.user])

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={state_stepregister.loading_user}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box mt={2} pl={2} pb={2}>
                <h2>User Management Company </h2>
            </Box>
           <div className="section-form-company-detail">
                <Box pl={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={4}>
                            <Grid item xl={6} lg={6} xs={12}>
                                <Grid container >
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h3>Full Name</h3></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.fullname}
                                            helperText={errors.fullname && errors.fullname.message}
                                            {...register('fullname', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            id="fullname"
                                            label="Full Name"
                                            name="fullname"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h3>Email</h3></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.email}
                                            helperText={errors.email && errors.email.message}
                                            {...register('email', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h3>Password</h3></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.password}
                                            helperText={errors.password && errors.password.message}
                                            {...register('password', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            type="password"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={1}><h3>Role</h3></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <Box pt={1} pb={1}>
                                        <Select
                                            placeholder="Select Role"
                                            value={selectedRoles}
                                            isSearchable={true}
                                            options={optionsRoles && optionsRoles}
                                            onChange={handleChangeRoles}
                                            id="select-style-cat"
                                        />
                                        </Box>
                                        { 
                                        /* istanbul ignore next */
                                        errorRoles ? <div className="error-p"><p>Role is required</p></div> : null }
                                    </Grid>
                                   
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, pb: 2 }}>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={() =>  { 
                                    dispatch(defaulCompanyDetail())
                                    dispatch(changeStep(0))
                                }}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button 
                                variant="contained"
                                type="submit"
                            >
                                Next
                            </Button>
                        </Box>
                        
                        
                    </form>
                </Box>
           </div>
        </div>
    )
}

export default FormUserManagement
