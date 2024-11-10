import { Auth, Dashboard } from './Routes/';
import { Route, Routes } from 'react-router-dom';

import LatestNewsArticle from './Routes/LatestNewsArticle';
import Photos from './Routes/Photos';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Tasks from './Routes/Tasks';

function App() {
  return (
    <div className='w-[100vw] h-[100dvh]'>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Auth />} />
        <Route path="*" element={<Auth />} />

        <Route path="/latestnews" element={<LatestNewsArticle />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/photos"
          element={
            <ProtectedRoute>
              <Photos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
