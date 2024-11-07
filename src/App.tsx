import { Auth, Dashboard } from './Routes/';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <div className='w-[100vw] h-[100dvh]'>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Auth />} />

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
