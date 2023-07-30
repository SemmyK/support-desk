import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
	const navigate = useNavigate()

	const onLogout = () => {
		// dispatch(logout())
		navigate('/')
	}

	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>Support Desk</Link>
			</div>
			<ul>
				{false ? (
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
