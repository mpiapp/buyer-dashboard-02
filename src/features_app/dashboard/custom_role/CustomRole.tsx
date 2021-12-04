import { Box } from '@mui/system'
import { Button, Stack } from '@mui/material';
import { TableColumn } from 'react-data-table-component';
import { useHistory } from 'react-router';
import BreadCrumbs from '../../../components/BreadCrumbs'
import DataTableBase from '../../../components/TableData';
// import {userCredentials} from './../../../utilities/config'
import { IDataRowRoles } from './customRolesTypes';

function CustomRole() {

    // console.log(userCredentials, 'userrr')
    const history = useHistory()

    const data = [
        {
            "_id" : "gsdasdfadawe",
            "role": "Owner",
            "modules" : []
        },
        {
            "_id" : "asdf2tekkadjs",
            "role": "Admin",
            "modules" : []
        }
    ]

    const columns: TableColumn<IDataRowRoles>[] = [
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
            name: 'ROLE',
            selector: row => row.role,
        },
        {
            name: 'DETAIL',
            width: '200px',
            cell: (row) => (
                <Stack direction="row" spacing={2}>
                    <Button 
                        variant="outlined" color="primary" size="small"
                        onClick={() => {
                            history.push({
                                pathname: `/dashboard/custom-role/${row._id}`,
                                state: {
                                    name : row.role,
                                    module : row.modules
                                }
                            })
                        }}
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
                current="Custom Role"
            />
            <Stack direction="row" justifyContent="space-between" pt={3} >
                <Box>
                    <h2>Custom Roles</h2>
                </Box>
                <Box>
                    <Button 
                        variant="contained" color="primary" size="small"
                        // onClick={() => handleClickOpen()}
                    >
                        Add New Role
                    </Button>
                </Box>
            </Stack>

            <Box sx={{pt:3}}>
                <DataTableBase 
                    columns={columns}
                    data={data}
                    // progressPending={usersuperadmin?.loading}
                />
            </Box>
        </Box>
    )
}

export default CustomRole
