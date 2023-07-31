import { Navigate, Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'
import FadeLoader from 'react-spinners/FadeLoader'

function PrivateRoute() {
	const { loggedIn, checkingStatus } = useAuthStatus()

	if (checkingStatus) {
		return (
			<div
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'center',
				}}
			>
				<FadeLoader height='30px' width='5px' radius='20px' />
			</div>
		)
	}
	return loggedIn ? <Outlet /> : <Navigate to='/register' />
}
export default PrivateRoute
