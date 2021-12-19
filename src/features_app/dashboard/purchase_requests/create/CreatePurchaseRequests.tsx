import { Box } from '@mui/system'
import { Stack } from '@mui/material';
import BreadCrumbs from '../../../../components/BreadCrumbs'
import AlgoliaSearch from '../../../../components/AlgoliaSearch';
import CartPurchaseRequest from '../../../../components/CartPurchaseRequest';
import { useDispatch } from 'react-redux';
import { addToLocalDBCarts } from './reducers/createPurchaseRequestReducers';
import { useLocation } from 'react-router-dom';

function CreatePurchaseRequests() {
    const dispatch = useDispatch()
    const location = useLocation()
    const state_location : any = location.state

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
                    <h2>{state_location === undefined ? "Create New" : state_location.name } Purchase Request</h2>
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
