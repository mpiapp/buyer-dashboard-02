import BuyerLists from './BuyerLists';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element BuyerLists page", () => {
    it('should render all element in BuyerLists page', () => {
        render(<BuyerLists />)
    
        // render main component
        expect(screen.getByText(/Prefered Buyer Lists is coming soon/)).toBeInTheDocument();

    })
})
