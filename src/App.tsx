import { Auth, Dashboard } from './Routes/'
import { Route, Routes } from 'react-router-dom'

import ProtectedRoute from './components/Auth/ProtectedRoute'
import UnprotectedRoute from './components/Auth/UnprotectedRoute'

function App() {


  return (
    <div className='w-[100vw] h-[100dvh] bg-blue-200'>
      <Routes>

        <Route path="/" element={<UnprotectedRoute><Auth /></UnprotectedRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />


      </Routes>
    </div>
  )
}

export default App
