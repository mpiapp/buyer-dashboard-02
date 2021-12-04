import CustomRole from './CustomRole';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard customrole page", () => {
    it('should render all element in dashboard customrole page', () => {
        render(<CustomRole />)
    
        // render main component
        expect(screen.getByText(/custom roles/i)).toBeInTheDocument();

    })
})
