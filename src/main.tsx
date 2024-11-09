import './index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import PhotoContext from './context/usePhotoContext';
import ReactDOM from 'react-dom/client';
import TaskContext from './context/useTaskContext';
import UserContext from './context/userAuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <TaskContext>
      <PhotoContext>
        <UserContext>
          <App />
        </UserContext>
      </PhotoContext>
    </TaskContext>
  </BrowserRouter>
);