import { useState, useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system'
import { TableColumn } from 'react-data-table-component';
import BreadCrumbs from '../../../components/BreadCrumbs'
import DataTableBase from '../../../components/TableData'
import { UserSuperadminInput } from './teamsTypes';
import TextField from '@mui/material/TextField';
import Select from 'react-select'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { 
    ISelectOption,
} from '../globalTypes'
import { userCredentials } from '../../../utilities/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { getAllUsersTeams } from './reducers/teamsReducers';
import swal from 'sweetalert';
import axios from 'axios'
import { postAddUserManagement } from '../step_register/reducers/stepRegisterReducers';
import ButtonLoading from '../../../components/ButtonLoading';

const validationSchema = yup    
    .object({
        name: yup.string()
        .required("Name is required"),
        email: yup.string()
        .required("Email is required")
        .email("Email is invalid"),
        password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
    })
    .required();
  

const TeamsPage = () => {

    const dispatch = useDispatch()
    const state_teams = useSelector((state : RootState) => state.users_team)
    const state_stepregister = useSelector((state : RootState) => state.step_register)

    // console.log(state_teams, 'teams')
    // console.log(userCredentials, 'teams')

    const [open, setOpen] = useState(false);
    // const [IdUsers, setIdUsers] = useState <any>(null);

    const [optionsRoles, setOptionsRoles] = useState<ISelectOption[]>([
        { value: "Admin", label: "Admin" },
        { value: "Picker", label: "Picker" },
        { value: "Accounting", label: "Accounting" }
    ]);
    const [selectedRoles, setSelectedRoles] = useState<ISelectOption>();
    const [errorSelectRoles, setErrorSelectRoles] = useState<boolean>(false);

     /* istanbul ignore next */
    const handleChangeRoles = (value: any) : void => {
        setSelectedRoles(value)
        setErrorSelectRoles(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
      } = useForm<UserSuperadminInput>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = (data: UserSuperadminInput): void => {
        if(selectedRoles === undefined) {
            setErrorSelectRoles(true)
        } else {
            // if(IdUserSuperadmin === null) {
                let postUser = {
                    user_email: data.email,
                    user_password : data.password,
                    user_name : data.name,
                    buyer_id: userCredentials.buyer_id,
                    company_code: userCredentials.company_code,
                    role_id: selectedRoles.value
                }
                dispatch(postAddUserManagement(postUser))
        }
    }

    useEffect(() => {
        if(state_stepregister.user) {
            handleClose()
            reset()
            window.location.reload()
        }
        // eslint-disable-next-line
    }, [state_stepregister.user]);

    /* istanbul ignore next */
    const onClickUpdate = (row : any) => {
        setValue("name", row.fullname);
        setValue("email", row.email);
        setValue("password", row.email);
        // setIdUsers(row._id)
        setSelectedRoles({ value: row.role, label: row.role })
        setTimeout(() => {
            handleClickOpen()
        }, 100);
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
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(getAllUsersTeams())
        // eslint-disable-next-line
    }, []);

    const columns: TableColumn<any>[] = [
        {
            name: 'NO',
            width: '70px',
            cell: (row, index) => (
                <p>{index + 1}</p>
            )
        },
        {
            name: 'ID',
            selector: row => row._id,
            width: '200px'

        },
        {
            name: 'NAME',
            selector: row => row.fullname,
        },
        {
            name: 'EMAIL',
            selector: row => row.email,
        },
        {
            name: 'ROLE',
            selector: row => row.role_id,
        },
        {
            name: 'STATUS',
            selector: row => row.status,
        },
        {
            name: 'ACTION',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                        onClick={() => onClickUpdate(row)}
                    >
                        Update
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs
                isPage={false}
                current="Teams Page"
            />
            <Stack direction="row" justifyContent="space-between" pt={3} >
                <Box>
                    <h2>Users Team Management</h2>
                </Box>
                <Box>
                    <Button 
                        variant="contained" color="primary" size="small"
                        onClick={() => handleClickOpen()}
                    >
                        Add New User
                    </Button>
                </Box>
            </Stack>

            {/* Dialog add new user */}
            <Dialog 
                open={open} 
                fullWidth={true}
                maxWidth="sm"
            >
                <form onSubmit={handleSubmit(onSubmit)} >
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogContent style={{minHeight: 500}}>
                        <TextField
                            error={!!errors.name}
                            helperText={errors.name && errors.name.message}
                            {...register('name')}
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            size="small"
                        />
                        <TextField
                            error={!!errors.email}
                            helperText={errors.email && errors.email.message}
                            {...register('email')}
                            margin="normal"
                            fullWidth
                            id="email-user"
                            label="Email"
                            name="email"
                            size="small"
                        />
                        <TextField
                            error={!!errors.password}
                            helperText={errors.password && errors.password.message}
                            {...register('password')}
                            margin="normal"
                            fullWidth
                            type="password"
                            id="password-user"
                            label="Password"
                            name="password"
                            size="small"
                        />
                        <Box pt={2}>
                            <Select
                                placeholder="Select Role"
                                value={selectedRoles}
                                isSearchable={false}
                                options={optionsRoles}
                                onChange={handleChangeRoles}
                            />
                            { 
                            /* istanbul ignore next */
                            errorSelectRoles ? <div className="error-p"><p>Role is required</p></div> : null }
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="warning" variant="outlined">Cancel</Button>
                        <Box mr={1} />
                        <ButtonLoading 
                            type="submit"
                            name="Submit"
                            loading={state_stepregister.loading_user}
                        />
                    </DialogActions>
                </form>
            </Dialog>

            <Box sx={{pt:3}}>
                <DataTableBase 
                    columns={columns}
                    data={state_teams.data}
                    progressPending={state_teams?.loading}
                />
            </Box>

        </Box>
    )
}

export default TeamsPage
