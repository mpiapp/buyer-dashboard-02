/* istanbul ignore file */
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { 
  Route, 
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import NavDashboard from '../components/NavDashboard'

interface Props {
  component : React.ElementType;
  path?: string | string[];
  exact?: boolean;
}

const  DashboardLayout : React.FC<Props> = ({ component : Component, ...rest }) => {

  const auth = useSelector((state : RootState) => state.login.login)

  const isAuthenticated = () => {
    if(auth) {
        return auth
    } else {
        return false
    }
  }

  return (

    <Route {...rest} 
        render={props => {
            if(isAuthenticated()){
                return (
                  <Box sx={{ display: 'flex' }}>
                    <NavDashboard />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                      <Toolbar />
                      <Component {...props} />
                    </Box>
                  </Box>
                )
            }
            else {
                return (
                    <Redirect 
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        }}
    />
    
  );
}

export default DashboardLayout;