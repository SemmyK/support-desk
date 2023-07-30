import { BrowserRouter, Route, Routes } from 'react-router-dom'
//components
import Header from './components/Header'
//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<>
			<BrowserRouter>
				<div className='container'>
					<Header />

					<main>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
						</Routes>
					</main>
				</div>
			</BrowserRouter>
			<ToastContainer />
		</>
	)
}

export default App
