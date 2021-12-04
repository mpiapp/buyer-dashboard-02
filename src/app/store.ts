import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features_app/auth/login/loginSlice';
import registerReducer from '../features_app/auth/register/registerSlice';
import stepRegisterReducer from '../features_app/dashboard/step_register/stepRegisterSlice';
import forgotReducer from '../features_app/auth/forgot/forgotSlice';
import cartsReducer from '../features_app/dashboard/purchase_requests/create/createPurchaseRequestSlice';
import purchaseRequestReducer from '../features_app/dashboard/purchase_requests/purchaseRequestSlice'
import purchaseOrdersReducer from '../features_app/dashboard/purchase_orders/purchaseOrdersSlice'
import approvePurchaseRequestReducer from '../features_app/dashboard/purchase_requests/detail/detailPurchaseRequestSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    forgot : forgotReducer,
    register: registerReducer,
    step_state : stepRegisterReducer,
    carts : cartsReducer,
    purchase_request : purchaseRequestReducer,
    purchase_orders : purchaseOrdersReducer,
    approve_po : approvePurchaseRequestReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
