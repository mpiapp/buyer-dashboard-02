import SettingPage from './SettingPage';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element setting page", () => {
    it('should render all element in setting page', () => {
        render(<SettingPage />)
    
        // render main component
        expect(screen.getByText(/Setting page is cooming soon/)).toBeInTheDocument();

    })
})
