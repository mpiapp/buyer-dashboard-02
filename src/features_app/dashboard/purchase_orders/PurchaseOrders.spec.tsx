import PurchaseOrders from './PurchaseOrders';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard home page", () => {
    it('should render all element in dashboard home page', () => {
        render(<PurchaseOrders />)
    
        // render main component
        expect(screen.getByText(/PurchaseOrders page is cooming soon/)).toBeInTheDocument();

    })
})
