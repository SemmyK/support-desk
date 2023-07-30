import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'
//assets
import { FaUser } from 'react-icons/fa'
//components
import { toast } from 'react-toastify'
import FadeLoader from 'react-spinners/FadeLoader'

function Register() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const { name, email, password, password2 } = formData

	//useSelector hook from redux to get access to certain data from state
	const { isLoading } = useSelector(state => state.auth)

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	const onSubmit = e => {
		e.preventDefault()

		if (password !== password2) {
			toast.error('Passwords do not match')
		} else {
			//create object with data we want to use for registering user
			const userData = {
				name,
				email,
				password,
			}

			//dispatch register action
			dispatch(register(userData))
				.unwrap()
				.then(user => {
					// NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
					// getting a good response from our API or catch the AsyncThunkAction
					// rejection to show an error message
					toast.success(`Registered new user - ${user.name}`)
					navigate('/')
				})
				.catch(toast.error)
		}
	}

	if (isLoading) {
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
	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							onChange={onChange}
							placeholder='Enter your name'
							required
						/>
					</div>
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
						<input
							type='password'
							className='form-control'
							id='password2'
							name='password2'
							value={password2}
							onChange={onChange}
							placeholder='Confirm password'
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
export default Register
