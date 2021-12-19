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
import { UserFormSubmit } from '../stepRegisterTypes'
import { ISelectOption } from '../../globalTypes'
import { changeStep } from './stepFormSlice'
import { postCompanyDetail } from '../reducers/stepRegisterReducers';
import { RootState } from '../../../../app/store';
import { userCredentials } from '../../../../utilities/config';
import axios from 'axios'
import swal from 'sweetalert';

const validationSchema = yup
  .object({
    legalname: yup.string()
        .required("Legal Name is required"),
    aliasname: yup.string()
        .required("Alias Name is required"),
    phonenumber: yup.number()
        .typeError('Phone Number is required')
        .required("Phone Number is required"),
    whatsapp: yup.number()
        .typeError('Phone Number is required')
        .required("Whatsapp is required"),
    street: yup.string()
        .required("Street is required"), 
  })
  .required();

const FormCompanyDetail : React.FC<any> = ({
    profile
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
      } = useForm<UserFormSubmit>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const dispatch = useDispatch()
    const state_stepregister = useSelector((state : RootState) => state.step_register)

    // state for category company
    const [optionsCategoryCompany, setOptionsCategoryCompany] = useState<ISelectOption[]>([]);
    const [selectedCategoryCompany, setSelectedCategoryCompany] = useState<any>([]);
    const [errorCategoryCompany, setErrorCategoryCompany] = useState<boolean>(false);

    // state for type company
    const [optionsTypeCompany, setOptionsTypeCompany] = useState<ISelectOption[]>([]);
    const [selectedTypeCompany, setSelectedTypeCompany] = useState<any>([]);
    const [errorTypeCompany, setErrorTypeCompany] = useState<boolean>(false);

    /* istanbul ignore next */
    const handleChangeTypeCompany = (value: any) : void => {
        setErrorTypeCompany(false)
        setSelectedTypeCompany(value)
    }

     /* istanbul ignore next */
     const handleChangeCategoryCompany = (value: any) : void => {
         setErrorCategoryCompany(false)
        setSelectedCategoryCompany(value)
    }

    const checkError = () => {
        let error = true
        if(selectedCategoryCompany.length === 0) {
            setErrorCategoryCompany(true)
            error = true
        } else if (selectedTypeCompany.length === 0) {
            setErrorTypeCompany(true)
            error = true
        } else {
            error = false
        }
        return error
    }

    const onSubmit = (data: UserFormSubmit): void => {
        let save_local = {
            category: selectedCategoryCompany,
            type : selectedTypeCompany,
            legal_name : data.legalname,
            name : data.aliasname,
            address : data.street,
            phone : data.phonenumber,
            whatsapp : data.whatsapp,
            website : data.website,
            instagram : data.instagram,
            facebook : data.facebook,
            twitter : data.twitter
        }
        let body_send  = {
            _id: userCredentials.buyer_id,
            category: selectedCategoryCompany.value,
            type : selectedTypeCompany.label,
            legal_name : data.legalname,
            name : data.aliasname,
            address : data.street,
            phone : data.phonenumber,
            whatsapp : data.whatsapp,
            website : data.website,
            instagram : data.instagram,
            facebook : data.facebook,
            twitter : data.twitter
        }
        localStorage.setItem('legal_doc_company', JSON.stringify(selectedTypeCompany.value))
        if(!checkError()) {
            if(profile) {
                localStorage.setItem('company_detail', JSON.stringify(save_local))
                dispatch(postCompanyDetail(body_send))
            } else {
                dispatch(postCompanyDetail(body_send))
                localStorage.setItem('company_detail', JSON.stringify(save_local))
            }
        }
    }

    const getCompanyCategory = async () => {
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/master/category`)
            if(response.data.errors === null) {
                let category = response.data.data
                let array_category = []
                for(let element of category) {
                    array_category.push({
                        label : element.category,
                        value : element.category
                    })
                }
                setOptionsCategoryCompany(array_category)
            } else {
                swal('Error', `${response.data.message}`, 'error')
            }
            
        } catch (error) {
            swal('Error', `${error}`, 'error')
        }
    }

    const getCompanyType = async () => {
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/master/type`)
            if(response.data.errors === null) {
                let type = response.data.data
                let array_type = []
                for(let element of type) {
                    array_type.push({
                        label : element.companyType,
                        value : element.legalDoc
                    })
                }
                setOptionsTypeCompany(array_type)
            } else {
                swal('Error', `${response.data.message}`, 'error')
            }
            
        } catch (error) {
            swal('Error', `${error}`, 'error')
        }
    }


    useEffect(() => {
        getCompanyCategory()
        getCompanyType()
    }, []);

    useEffect(() => {
        if(state_stepregister.company_detail) {
            dispatch(changeStep(1))
        }
        // eslint-disable-next-line
    }, [state_stepregister.company_detail])

    useEffect(() => {
        const local_data = localStorage.getItem('company_detail')
        const checkLocalData = () => {
            const data : any = local_data === null ? null : JSON.parse(local_data)
            setValue('legalname', data.legal_name)
            setValue('aliasname', data.name)
            setValue('phonenumber', data.phone)
            setValue('whatsapp', data.whatsapp)
            setValue('street', data.address)
            setValue('instagram', data.instagram)
            setValue('facebook', data.facebook)
            setValue('twitter', data.twitter)
            setValue('website', data.website)
            setSelectedCategoryCompany(data.category)
            setSelectedTypeCompany(data.type)
        }
        if(local_data !== null) {
            checkLocalData()
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
             <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={state_stepregister.loading_comp_detail}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            { profile ? null : 
            <Box mt={2} pb={2}>
                <h3>Profile Company Detail</h3>
            </Box> }
           <div className="section-form-company-detail">
                <Box >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={4}>
                            <Grid item xl={6} lg={6} xs={12}>
                                <Grid container >
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Legal Name</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.legalname}
                                            helperText={errors.legalname && errors.legalname.message}
                                            {...register('legalname', { required: true })}
                                            margin="dense"
                                            defaultValue={userCredentials.vendor_name}
                                            fullWidth
                                            id="legalname"
                                            label="Company Legal Name"
                                            name="legalname"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Alias Name</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.aliasname}
                                            helperText={errors.aliasname && errors.aliasname.message}
                                            {...register('aliasname', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            id="aliasname"
                                            label="Alias Company Name"
                                            name="aliasname"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={1}><h4>Category Company</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <Box pt={1} pb={1}>
                                        <Select
                                            placeholder="Select Category Company"
                                            value={selectedCategoryCompany}
                                            isSearchable={true}
                                            options={optionsCategoryCompany && optionsCategoryCompany}
                                            onChange={handleChangeCategoryCompany}
                                            id="select-style-cat"
                                        />
                                        </Box>
                                        { 
                                        errorCategoryCompany ? <div className="error-p"><p>Category is required</p></div> : null }
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={1}><h4>Type Company</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <Box pt={1} pb={1}>
                                        <Select
                                            placeholder="Select Type Company"
                                            value={selectedTypeCompany}
                                            isSearchable={true}
                                            options={optionsTypeCompany && optionsTypeCompany}
                                            onChange={handleChangeTypeCompany}
                                            id="select-style-type"
                                        />
                                        </Box>
                                        { 
                                        errorTypeCompany ? <div className="error-p"><p>Type is required</p></div> : null }
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Address</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.street}
                                            helperText={errors.street && errors.street.message}
                                            {...register('street', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            name="street"
                                            label="Street"
                                            type="text"
                                            id="street"
                                            size="small"
                                            multiline
                                            rows={3}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xl={6} lg={6} xs={12}>
                                <Grid container >
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Phone Number</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.phonenumber}
                                            helperText={errors.phonenumber && errors.phonenumber.message}
                                            {...register('phonenumber', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            name="phonenumber"
                                            label="Phone Number"
                                            type="number"
                                            id="phonenumber"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Whatsapp Number</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.whatsapp}
                                            helperText={errors.whatsapp && errors.whatsapp.message}
                                            {...register('whatsapp', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            name="whatsapp"
                                            label="Whatsapp Number"
                                            type="number"
                                            id="whatsapp"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Website</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.website}
                                            helperText={errors.website && errors.website.message}
                                            {...register('website', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            name="website"
                                            label="Website"
                                            type="website"
                                            id="website"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Instagram</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.instagram}
                                            helperText={errors.instagram && errors.instagram.message}
                                            {...register('instagram', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            name="instagram"
                                            label="Instagram"
                                            type="instagram"
                                            id="instagram"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Facebook</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.facebook}
                                            helperText={errors.facebook && errors.facebook.message}
                                            {...register('facebook', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            name="facebook"
                                            label="Facebook"
                                            type="facebook"
                                            id="facebook"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Twitter</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.twitter}
                                            helperText={errors.twitter && errors.twitter.message}
                                            {...register('twitter', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            name="twitter"
                                            label="Twitter"
                                            type="twitter"
                                            id="twitter"
                                            size="small"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        { profile ? 
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, pb: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button 
                                variant="contained"
                                type="submit"
                            >
                                Save Change
                            </Button>
                        </Box> : 
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, pb: 2 }}>
                            <Button
                                variant="contained"
                                color="inherit"
                                sx={{ mr: 1 }}
                                disabled
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
                        }
                        
                    </form>
                </Box>
           </div>
        </div>
    )
}

export default FormCompanyDetail
