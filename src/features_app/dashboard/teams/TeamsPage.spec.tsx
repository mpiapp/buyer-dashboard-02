import TeamsPage from './TeamsPage';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element teams home page", () => {
    it('should render all element in teams home page', () => {
        render(<TeamsPage />)
    
        // render main component
        expect(screen.getByText(/teams/i)).toBeInTheDocument();

    })
})
