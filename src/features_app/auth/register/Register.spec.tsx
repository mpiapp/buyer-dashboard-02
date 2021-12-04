import RegisterPage from './Register';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element register page", () => {
    it('should render all element in register page', () => {
        render(<RegisterPage />)
    
        // render navbar component
        expect(screen.getByAltText(/logo mpi/)).toBeInTheDocument()
        // render footer component
        expect(screen.getByText(/pt manajemen pemesanan indonesia/i)).toBeInTheDocument();
        expect(screen.getByText(/copyright/i)).toBeInTheDocument();
    
        // render main component
        expect(screen.getByText("Register for Buyer")).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name : 'Sign Up'})).toBeInTheDocument();
        // expect(screen.getByRole('link', { name: "Forgot password?" })).toBeInTheDocument();
    })
})
