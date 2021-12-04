import FinancePage from './FinancePage';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element finance page", () => {
    it('should render all element in finance page', () => {
        render(<FinancePage />)
    
        // render main component
        expect(screen.getByText(/Finance page is cooming soon/)).toBeInTheDocument();

    })
})
