import { Box } from '@mui/system'
import { Stack } from '@mui/material';
import BreadCrumbs from '../../../../components/BreadCrumbs'
import AlgoliaSearch from '../../../../components/AlgoliaSearch';
import CartTemplates from '../components/CartTemplatest';
import { addToLocalDBTemplate } from './reducers/createNewTemplateReducers';
import { useDispatch } from 'react-redux';

function CreateNewTemplate() {
    const dispatch = useDispatch()
   
    
    const addToCart = ( value : any) => {
        dispatch(addToLocalDBTemplate(value))
    }
    
    return (
        <Box sx={{pt:2, pl:3, pr:3}}>
            <BreadCrumbs 
                current="Create Purchase Requests"
                isPage={true}
                page="Purchase Request"
                link="/dashboard/purchase-requests"
            />
            <Stack direction="row" justifyContent="space-between" pt={3} >
                <Box>
                    <h2>Create New Template</h2>
                </Box>
                <CartTemplates/>
            </Stack>
            <Stack pt={3} >
                <AlgoliaSearch
                    addToCart={addToCart}
                />
            </Stack>
        </Box>
    )
}

export default CreateNewTemplate;
