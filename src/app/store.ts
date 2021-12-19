import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features_app/auth/login/loginSlice';
import registerReducer from '../features_app/auth/register/registerSlice';
import stepFormReducer from '../features_app/dashboard/step_register/components/stepFormSlice';
import forgotReducer from '../features_app/auth/forgot/forgotSlice';
import cartsReducer from '../features_app/dashboard/purchase_requests/create/createPurchaseRequestSlice';
import purchaseRequestReducer from '../features_app/dashboard/purchase_requests/purchaseRequestSlice'
import purchaseOrdersReducer from '../features_app/dashboard/purchase_orders/purchaseOrdersSlice'
import approvePurchaseRequestReducer from '../features_app/dashboard/purchase_requests/detail/detailPurchaseRequestSlice'
import stepRegisterReducer from '../features_app/dashboard/step_register/stepRegisterSlice'
import teamsReducers from '../features_app/dashboard/teams/teamsSlice'
import templateReducer from '../features_app/dashboard/templates/create/createTemplatestSlice'
import templateDataReducer from '../features_app/dashboard/templates/templatesSlice'
import getProfileReducer from '../features_app/dashboard/profile/profileSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    forgot : forgotReducer,
    register: registerReducer,
    step_state : stepFormReducer,
    carts : cartsReducer,
    carts_template : templateReducer,
    purchase_request : purchaseRequestReducer,
    template : templateDataReducer,
    purchase_orders : purchaseOrdersReducer,
    approve_po : approvePurchaseRequestReducer,
    step_register : stepRegisterReducer,
    users_team : teamsReducers,
    profile : getProfileReducer,

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
