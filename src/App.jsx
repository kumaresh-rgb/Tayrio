import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Login from './pages/Login'
import ChartsandMaps from './pages/ChartsandMaps'

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/Charts&maps' element={<ChartsandMaps />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App