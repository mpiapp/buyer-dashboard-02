import Error404 from './Error404';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element error page", () => {
    it('should render all element in error page', () => {
        render(<Error404 />)
    
        // render main component
        expect(screen.getByText(/page not found/i)).toBeInTheDocument();

    })
})
