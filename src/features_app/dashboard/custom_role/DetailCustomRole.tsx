import { Box } from '@mui/system'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { useLocation } from 'react-router'
import { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
// import {userCredentials} from './../../../utilities/config'


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const DetailCustomRole = () => {

    const location = useLocation()
    const [locationState, setlocationState] = useState<any>({});

    // console.log(locationState, 'locak')
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [checked, setChecked] = useState(true);

    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    
    useEffect(() => {
        const stateLocation = location.state
        if(stateLocation) {
            setlocationState(stateLocation)
        }
        // eslint-disable-next-line
    }, []);
    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                isPage={true}
                page="Custom Role"
                link="/dashboard/custom-role"
                current="Detail Custom Role"
            />
           <Box sx={{pt:2}}>
                <h2>{locationState?.name } Role</h2>
           </Box>

           <Box sx={{pt:3}}>
               <Paper elevation={2}>
                    <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', minHeight: 600, display: 'flex', p: 3 }}
                    >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="PO Modules" {...a11yProps(0)} />
                        {/* <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                        <Tab label="Item Four" {...a11yProps(3)} />
                        <Tab label="Item Five" {...a11yProps(4)} />
                        <Tab label="Item Six" {...a11yProps(5)} />
                        <Tab label="Item Seven" {...a11yProps(6)} />
                        <Tab label="Item Seven" {...a11yProps(7)} /> */}
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Features</TableCell>
                                    <TableCell>Create</TableCell>
                                    <TableCell>Read</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {[1,2,3].map((row) => (
                                <TableRow
                                    key={row}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    Purchase Request
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Checkbox
                                    checked={checked}
                                    onChange={handleChangeCheckBox}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Checkbox
                                    checked={checked}
                                    onChange={handleChangeCheckBox}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Checkbox
                                    checked={checked}
                                    onChange={handleChangeCheckBox}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Checkbox
                                    checked={checked}
                                    onChange={handleChangeCheckBox}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </TableCell>
                                
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TabPanel>
                    {/* <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item Four
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Item Five
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        Item Six
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        Item Seven
                    </TabPanel> */}
                    </Box>
               </Paper>
           </Box>
        </Box>
    )
}

export default DetailCustomRole;
