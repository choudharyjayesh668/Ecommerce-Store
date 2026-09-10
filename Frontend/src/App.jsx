import { Routes, Route } from "react-router-dom";
import './App.css'
import LandingPage from './Pages/LandingPage'
import Store from "./Pages/Store"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
function App() {
  
  return (
    <>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/store" element={<Store />} />
      {/* <Route path="/store"element={
          <ProtectedRoute>
              <Store />
          </ProtectedRoute>
        }/> */}
      </Routes>
    </>
  )
}

export default App
