import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { getTemplatesData } from '../features_app/dashboard/templates/reducers/templatesReducers';
import axios from 'axios'
import swal from 'sweetalert'

const LBase = require("localbase");
const db: any = new LBase.default("db");
db.config.debug = false

const MenuPopOver = ({
    name, color
}: any ) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const history = useHistory()
  const dispatch = useDispatch()
  const store_templates = useSelector((state : RootState) => state.template)

  React.useEffect(() => {
    dispatch(getTemplatesData())
     // eslint-disable-next-line
}, []);

  const onClickCreatePR = async (params:any) => {
  // setLoadingCreate(true)
  try {
      const items : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/template/Items/${params._id}`)
      if(items.data.errors === null) {
          let data_items = items.data.data
          let result = await db.collection('db_local_CART').set(data_items)
          if(result) {
              history.push({
                  pathname: "/dashboard/create/purchase-requests",
                  state : {
                      data : params,
                      page : "Create" 
                  }
              })
          }
      } else {
          swal('Error', `${items.data.message}`, 'error')
      }
    } catch (error) {
        swal('Error', `${error}`, 'error')
    }
  }



  return (
    <div>
    <Button 
        aria-describedby={id} 
        variant="contained" 
        onClick={handleClick}
        color={color}
    >
        {name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className="menu-pop-over"
      >
       <div className="box-menu">
          { store_templates.loading ? 
            <ul>
              Loading...
            </ul>  
            :
           <ul>
               { store_templates.data.map((data : any, i : any) => (
                 <li key={i} onClick={() => onClickCreatePR(data)}> {data.name}</li>
               )) }
           </ul>
          }
       </div>
      </Popover>
    </div>
  );
}


export default MenuPopOver;