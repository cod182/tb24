import { Auth, Dashboard } from './Routes/'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <div className='w-[100vw] h-[100dvh] bg-blue-200'>
      <Routes>

        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </div>
  )
}

export default App
