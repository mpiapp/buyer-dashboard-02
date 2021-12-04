import ProfilePage from './ProfilePage';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element profile page", () => {
    it('should render title element in profile page', () => {

        render(<ProfilePage/>)
        // render main component
        expect(screen.getByText(/Profile Company/i)).toBeInTheDocument();

        

    })  
})
