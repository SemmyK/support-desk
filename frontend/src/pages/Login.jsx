import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
//assets
import { FaSignInAlt } from 'react-icons/fa'
//components
import { toast } from 'react-toastify'
import FadeLoader from 'react-spinners/FadeLoader'

function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const { email, password } = formData
	//get loading from initial state
	const { isLoading } = useSelector(state => state.auth)

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	const onSubmit = e => {
		e.preventDefault()
		//construct user data from the form
		const userData = {
			email,
			password,
		}
		//dispatch login action
		dispatch(login(userData))
			.unwrap()
			.then(user => {
				// NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
				// getting a good response from our API or catch the AsyncThunkAction
				// rejection to show an error message
				toast.success(`Logged in as ${user.name}`)
				navigate('/')
			})
			.catch(toast.error)
	}

	if (isLoading) {
		return (
			<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
				<FadeLoader height='30px' width='5px' radius='20px' />
			</div>
		)
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please log in to get support</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							onChange={onChange}
							placeholder='Enter your email'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={onChange}
							placeholder='Enter password'
							required
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	)
}
export default Login
