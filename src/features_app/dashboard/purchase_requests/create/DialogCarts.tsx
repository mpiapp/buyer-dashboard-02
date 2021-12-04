import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

export default function CartDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (value : any) => {
    setState(value);
  }
  
  return (
    <div>
        <React.Fragment >
          {/* <Button onClick={() => toggleDrawer(true)}>Open</Button> */}

          <div className="floating-drawer">
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab variant="extended" onClick={() => toggleDrawer(true)}>
                    <NavigationIcon sx={{ mr: 1, color: '#39d059' }} />
                    Feedback
                </Fab>
            </Box>
        </div>

          {/* <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                    ))}
                </SpeedDial>
            </Box>
             */}
            <Drawer
                anchor="bottom"
                open={state}
                onClose={() => toggleDrawer(false)}
            >
                Open brooo 
            </Drawer>
        </React.Fragment>
    </div>
  );
}
