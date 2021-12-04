import { Box } from '@mui/system'
import { Stack } from '@mui/material';
import BreadCrumbs from '../../../../components/BreadCrumbs'
import AlgoliaSearch from '../../../../components/AlgoliaSearch';
import CartPurchaseRequest from '../../../../components/CartPurchaseRequest';
import { useDispatch } from 'react-redux';
import { addToLocalDBCarts } from './reducers/createPurchaseRequestReducers';

function CreatePurchaseRequests() {
    const dispatch = useDispatch()
    
    const addToCart = ( value : any) => {
        dispatch(addToLocalDBCarts(value))
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
                    <h2>Create New Purchase Request</h2>
                </Box>
                <CartPurchaseRequest/>
            </Stack>
            <Stack pt={3} >
                <AlgoliaSearch
                    addToCart={addToCart}
                />
            </Stack>
        </Box>
    )
}

export default CreatePurchaseRequests;
