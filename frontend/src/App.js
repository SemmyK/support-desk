import { BrowserRouter, Route, Routes } from 'react-router-dom'
//components
import Header from './components/Header'
//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
	return (
		<>
			<BrowserRouter>
				<div className='container'>
					<Header />

					<main>
						<Routes>
							{/* private routes */}

							<Route path='/' element={<PrivateRoute />}>
								<Route path='/' element={<Home />} />
							</Route>

							{/* protected routes */}
							<Route path='/login' element={<ProtectedRoute />}>
								<Route path='/login' element={<Login />} />
							</Route>
							<Route path='/register' element={<ProtectedRoute />}>
								<Route path='/register' element={<Register />} />
							</Route>
							<Route></Route>
						</Routes>
					</main>
				</div>
			</BrowserRouter>
			<ToastContainer />
		</>
	)
}

export default App
