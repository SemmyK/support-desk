import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

function Header() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user } = useSelector(state => state.auth)

	const onLogout = () => {
		dispatch(logout())
		navigate('/')
	}

	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>Support Desk</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className='btn' onClick={onLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to='/login'>
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<FaUser /> Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	)
}
export default Header
