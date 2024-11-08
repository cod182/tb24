import './index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import PhotoContext from './context/usePhotoContext';
import ReactDOM from 'react-dom/client';
import UserContext from './context/userAuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <PhotoContext>
      <UserContext>
        <App />
      </UserContext>
    </PhotoContext>
  </BrowserRouter>
);