import ChatPage from './ChatPage';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element chat page", () => {
    it('should render all element in chat page', () => {
        render(<ChatPage />)
    
        // render main component
        expect(screen.getByText(/Chat page is cooming soon/)).toBeInTheDocument();

    })
})
