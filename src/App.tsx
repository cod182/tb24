import { Auth, Dashboard } from './Routes/';
import { Route, Routes } from 'react-router-dom';

import LatestNewsArticle from './Routes/LatestNewsArticle';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <div className='w-[100vw] h-[100dvh]'>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Auth />} />

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
      </Routes>
    </div>
  );
}

export default App;
