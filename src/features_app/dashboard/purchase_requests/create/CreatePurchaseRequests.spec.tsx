import CreatePurchaseRequests from './CreatePurchaseRequests';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element product page", () => {
    it('should render all element in product page', () => {
        render(<CreatePurchaseRequests />)
    
        // render main component
        expect(screen.getByText(/Create New Purchase Request/)).toBeInTheDocument();

    })
})
