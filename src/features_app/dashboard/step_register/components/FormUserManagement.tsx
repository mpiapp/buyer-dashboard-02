import React, { useState } from 'react'
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
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IUserManagement } from '../stepRegisterTypes'
import { ISelectOption } from '../../globalTypes'
import { changeStep } from '../stepRegisterSlice';
import swal from 'sweetalert';


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
        reset,
        formState: { errors }
      } = useForm<IUserManagement>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
      
    // state for category company
    const [optionsRoles] = useState<ISelectOption[]>([
        { value: "Admin", label: "Admin" },
        { value: "Picker", label: "Picker" },
        { value: "Accounting", label: "Accounting" },
    ]);
    const [selectedRoles, setSelectedRoles] = useState<ISelectOption[]>([]);
    const [errorRoles] = useState<boolean>(false);

     /* istanbul ignore next */
     const handleChangeRoles = (value: any) : void => {
        setSelectedRoles(value)
    }


    const onSubmit = (data: IUserManagement): void => {
        // let dataUser = {
        //     email: data.email,
        //     password : data.password,
        //     fullname : data.fullname,
        // }
        setLoading(true)
        setTimeout(() => {
            reset()
            swal('success', "Success Saving Data", 'success')
            setLoading(false)
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 1000);
        }, 2000);
        // dispatch(changeStep(2))
    }

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
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
                                            options={optionsRoles}
                                            onChange={handleChangeRoles}
                                            id="select-style-cat"
                                        />
                                        </Box>
                                        { 
                                        /* istanbul ignore next */
                                        errorRoles ? <div className="error-p"><p>Category is required</p></div> : null }
                                    </Grid>
                                   
                                </Grid>
                            </Grid>
                            {/* <Grid item xl={6} lg={6} xs={12}>
                                <Grid container >
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h3>Post Code</h3></Box>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        </Grid>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, pb: 2 }}>
                            <Button
                                variant="contained"
                                color="inherit"
                                onClick={() => dispatch(changeStep(1))}
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
