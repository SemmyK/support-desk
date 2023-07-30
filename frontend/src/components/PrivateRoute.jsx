import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
	const { user } = useSelector(state => state.auth)
	return user ? <Outlet /> : <Navigate to='/register' />
}
export default PrivateRoute
