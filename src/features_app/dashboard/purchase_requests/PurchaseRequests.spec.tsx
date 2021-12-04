import PurchaseRequests from './PurchaseRequests';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element product page", () => {
    it('should render all element in product page', () => {
        render(<PurchaseRequests />)
    
        // render main component
        expect(screen.getByText(/PurchaseRequests page is cooming soon/)).toBeInTheDocument();

    })
})
