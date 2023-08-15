import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
function App() {
  return (
    <div className="dark">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
