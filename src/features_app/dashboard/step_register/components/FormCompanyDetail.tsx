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
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { UserFormSubmit } from '../stepRegisterTypes'
import { ISelectOption } from '../../globalTypes'
import { changeStep } from '../stepRegisterSlice'

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
    postcode: yup.string()
        .required("Postcode is required"),
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

    const [loading, setLoading] = useState(false);
      
    // state for category company
    const [optionsCategoryCompany] = useState<ISelectOption[]>([
        { value: "Hotel", label: "Hotel" },
        { value: "Restaurant", label: "Restaurant" },
        { value: "Cafe", label: "Cafe" },
    ]);
    const [selectedCategoryCompany, setSelectedCategoryCompany] = useState<ISelectOption[]>([]);
    const [errorCategoryCompany, setErrorCategoryCompany] = useState<boolean>(false);

    // state for type company
    const [optionsTypeCompany] = useState<ISelectOption[]>([
        { value: "PT", label: "PT" },
        { value: "CV", label: "CV" },
        { value: "UD", label: "UD" },
    ]);
    const [selectedTypeCompany, setSelectedTypeCompany] = useState<ISelectOption[]>([]);
    const [errorTypeCompany, setErrorTypeCompany] = useState<boolean>(false);

    // state for province
    const [optionsProvince] = useState<ISelectOption[]>([
        { value: "DKI Jakarta", label: "DKI Jakarta" },
        { value: "Jawa Tengah", label: "Jawa Tengah" },
        { value: "Sulawesi", label: "Sulawesi" },
    ]);
    const [selectedProvince, setSelectedProvince] = useState<ISelectOption[]>([]);
    const [errorProvince, setErrorProvince] = useState<boolean>(false);

    // state for city
    const [optionsCity] = useState<ISelectOption[]>([
        { value: "Jakarta Pusat", label: "Jakarta Pusat" },
        { value: "Jakarta Selatan", label: "Jakarta Selatan" },
        { value: "Jakarta Timur", label: "Jakarta Timur" },
    ]);
    const [selectedCity, setSelectedCity] = useState<ISelectOption[]>([]);
    const [errorCity, setErrorCity] = useState<boolean>(false);

    // state for District
    const [optionsDistrict] = useState<ISelectOption[]>([
        { value: "Tebet", label: "Tebet" },
        { value: "Bukit Duri", label: "Bukit Duri" },
        { value: "Matraman", label: "Matraman" },
    ]);
    const [selectedDistrict, setSelectedDistrict] = useState<ISelectOption[]>([]);
    const [errorDistrict, setErrorDistrict] = useState<boolean>(false);

    // state for SubDistrict
    const [optionsSubDistrict] = useState<ISelectOption[]>([
        { value: "Bukit Duri", label: "Bukit Duri" },
        { value: "Manggarai", label: "Manggarai" },
        { value: "Tebet", label: "Tebet" },
    ]);
    const [selectedSubDistrict, setSelectedSubDistrict] = useState<ISelectOption[]>([]);
    const [errorSubDistrict, setErrorSubDistrict] = useState<boolean>(false);


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

    /* istanbul ignore next */
    const handleChangeProvince = (value: any) : void => {
        setErrorProvince(false)
        setSelectedProvince(value)
    }

    /* istanbul ignore next */
    const handleChangeCity = (value: any) : void => {
        setErrorCity(false)
        setSelectedCity(value)
    }

    /* istanbul ignore next */
    const handleChangeDistrict = (value: any) : void => {
        setErrorDistrict(false)
        setSelectedDistrict(value)
    }

    /* istanbul ignore next */
    const handleChangeSubDistrict = (value: any) : void => {
        setErrorSubDistrict(false)
        setSelectedSubDistrict(value)
    }


    const checkError = () => {
        let error = true
        if(selectedCategoryCompany.length === 0) {
            setErrorCategoryCompany(true)
            error = true
        } else if (selectedTypeCompany.length === 0) {
            setErrorTypeCompany(true)
            error = true
        } else if (selectedProvince.length === 0) {
            setErrorProvince(true)
            error = true
        } else if (selectedCity.length === 0) {
            setErrorCity(true)
            error = true
        } else if (selectedDistrict.length === 0) {
            setErrorDistrict(true)
            error = true
        } else if (selectedSubDistrict.length === 0) {
            setErrorSubDistrict(true)
            error = true
        } else {
            error = false
        }
        return error
    }

    const onSubmit = (data: UserFormSubmit): void => {
        let dataOptions = {
            company_category: selectedCategoryCompany,
            type : selectedTypeCompany,
            legalname : data.legalname,
            aliasname : data.aliasname,
            province : selectedProvince,
            city : selectedCity,
            district: selectedDistrict,
            subdistrict: selectedSubDistrict,
            postcode : data.postcode,
            street : data.street,
            phonenumber : data.phonenumber,
            whatsapp : data.whatsapp,
            website : data.website,
            instagram : data.instagram,
            facebook : data.facebook,
            twitter : data.twitter
        }
        if(!checkError()) {
            setLoading(true)
            if(profile) {
                setTimeout(() => {
                    setLoading(false)
                    localStorage.setItem('company_detail', JSON.stringify(dataOptions))
                }, 2000);
            } else {
                setTimeout(() => {
                    setLoading(false)
                    dispatch(changeStep(1))
                    localStorage.setItem('company_detail', JSON.stringify(dataOptions))
                }, 2000);
            }
        }
    }

    useEffect(() => {
        const local_data = localStorage.getItem('company_detail')
        const checkLocalData = () => {
            const data : any = local_data === null ? null : JSON.parse(local_data)
            setValue('legalname', data.legalname)
            setValue('aliasname', data.aliasname)
            setValue('phonenumber', data.phonenumber)
            setValue('whatsapp', data.whatsapp)
            setValue('street', data.street)
            setValue('postcode', data.postcode)
            setValue('instagram', data.instagram)
            setValue('facebook', data.facebook)
            setValue('twitter', data.twitter)
            setValue('website', data.website)
            setSelectedCategoryCompany(data.company_category)
            setSelectedTypeCompany(data.type)
            setSelectedProvince(data.province)
            setSelectedDistrict(data.district)
            setSelectedSubDistrict(data.subdistrict)
            setSelectedCity(data.city)
        }
        if(local_data !== null) {
            checkLocalData()
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const legalname = localStorage.getItem('legalname')
        if(!legalname !== null) {
            const data : any = legalname === null ? null : legalname
            setValue('legalname', data)
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div>
             <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
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
                                            options={optionsCategoryCompany}
                                            onChange={handleChangeCategoryCompany}
                                            id="select-style-cat"
                                        />
                                        </Box>
                                        { 
                                        /* istanbul ignore next */
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
                                            options={optionsTypeCompany}
                                            onChange={handleChangeTypeCompany}
                                            id="select-style-type"
                                        />
                                        </Box>
                                        { 
                                        /* istanbul ignore next */
                                        errorTypeCompany ? <div className="error-p"><p>Type is required</p></div> : null }
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Province</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <Box pt={1} pb={1}>
                                        <Select
                                            placeholder="Select Province"
                                            value={selectedProvince}
                                            isSearchable={true}
                                            options={optionsProvince}
                                            onChange={handleChangeProvince}
                                            id="select-style-province"
                                        />
                                        </Box>
                                        { 
                                        /* istanbul ignore next */
                                        errorProvince ? <div className="error-p"><p>Province is required</p></div> : null }
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>City</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <Box pt={1} pb={1}>
                                        <Select
                                            placeholder="Select City"
                                            value={selectedCity}
                                            isSearchable={true}
                                            options={optionsCity}
                                            onChange={handleChangeCity}
                                            id="select-style-city"
                                        />
                                        </Box>
                                        { 
                                        /* istanbul ignore next */
                                        errorCity ? <div className="error-p"><p>City is required</p></div> : null }
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>District</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <Box pt={1} pb={1}>
                                        <Select
                                            placeholder="Select District"
                                            value={selectedDistrict}
                                            isSearchable={true}
                                            options={optionsDistrict}
                                            onChange={handleChangeDistrict}
                                            id="select-style-district"
                                        />
                                        </Box>
                                        { 
                                        /* istanbul ignore next */
                                        errorDistrict ? <div className="error-p"><p>District is required</p></div> : null }
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Subdistrict</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <Box pt={1} pb={1}>
                                        <Select
                                            placeholder="Select Subdistrict"
                                            value={selectedSubDistrict}
                                            isSearchable={true}
                                            options={optionsSubDistrict}
                                            onChange={handleChangeSubDistrict}
                                            id="select-style-subdistrict"
                                        />
                                        </Box>
                                        { 
                                        /* istanbul ignore next */
                                        errorSubDistrict ? <div className="error-p"><p>Subdistrict is required</p></div> : null }
                                    </Grid>
                                   
                                </Grid>
                            </Grid>
                            <Grid item xl={6} lg={6} xs={12}>
                                <Grid container >
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Post Code</h4></Box>
                                    </Grid>
                                    <Grid item xl={9} lg={8} xs={12}>
                                        <TextField
                                            error={!!errors.postcode}
                                            helperText={errors.postcode && errors.postcode.message}
                                            {...register('postcode', { required: true })}
                                            margin="dense"
                                            fullWidth
                                            name="postcode"
                                            label="Post Code"
                                            type="text"
                                            id="postcode"
                                            size="small"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} xs={12}>
                                        <Box pt={2}><h4>Street</h4></Box>
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
                                        />
                                    </Grid>
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
