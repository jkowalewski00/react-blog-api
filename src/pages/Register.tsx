import React, { useEffect, useState } from 'react'
import { UserType } from '../types/UserType'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userInfo } from 'os'
import validation from '../components/RegisterValidator'
import { addUser } from '../services/api-service'
import { toast } from 'react-toastify'

const Register = () => {
	const [formValue, setFormValue] = useState<UserType>({
		name: '',
		username: '',
		email: '',
		password: '',
		role: 'user',
	})

	const [errors, setErrors] = useState<UserType>({
		name: '',
		username: '',
		email: '',
		password: '',
		role: '',
	})

	const [dataIsCorrect, setDataIsCorrect] = useState(false)
	const navigate = useNavigate()

	const handleChange = (e: any) => {
		setFormValue({
			...formValue,
			[e.target.name]: e.target.value,

			// [e.target.username]: e.target.value,
			// [e.target.email]: e.target.email,
			// [e.target.password]: e.target.password,
			// [e.target.role]: e.target.role,
		})
	}

	const handleFormSubmit = (e: any) => {
		e.preventDefault()
		setErrors(validation(formValue))
		setDataIsCorrect(true)
		// const userData = { ...formValue };

		// if (
		//   errors.name === "" &&
		//   errors.username === "" &&
		//   errors.email === "" &&
		//   errors.password === ""
		// ) {
		//   console.log("Brak bledow");

		//   //   const response = axios.post("http://localhost:5000/users", userData);
		//   // const response: any = addUser(userData);
		//   // toast.success("Account created succesfully!");

		//   setFormValue({
		//     name: "",
		//     username: "",
		//     email: "",
		//     password: "",
		//     role: "user",
		//   });

		//   // navigate("/");
		//   // if (response.status === 201) {
		//   //   toast.success("Post created successfully!");
		//   //   navigate("/");
		//   // } else
		//   // toast.error("Something went wrong!");
		// }

		// // if (response.status === 201)
		// //     toast.success("Post created successfully!");
		// // else
		// //     toast.error("Something went wrong!");

		// //navigate("/");
	}

	const uploadData = async (userData: UserType) =>{
		const response : any =  await addUser(userData);
		setFormValue({
			name: '',
			username: '',
			email: '',
			password: '',
			role: 'user',
		})
		if (response.status === 201) {
			navigate('/')
			toast.success('Account created successfully!')
		} else {
			console.log(userData);
			toast.error('Something went wrong!')
		}
	}

	useEffect(() => {
		if (Object.keys(errors).length === 0) {
			const userData = { ...formValue }
			setDataIsCorrect(true)
			uploadData(userData);
		}
	}, [errors])

	const [formIsSubmitted, setFormIsSubmitetd] = useState(false)

	const submitForm = () => {
		setFormIsSubmitetd(true)
	}

	// if (formIsSubmitted === true){
	//   navigate("/");
	//   toast.success("Account created successfully!");
	// }

	return (
		<>
			<div className='container'>
				<form method='POST'>
					<label htmlFor='name' className='form-label'>
						Name
					</label>
					<input
						type='text'
						name='name'
						className='form-control'
						placeholder='Put your name here...'
						value={formValue.name}
						onChange={handleChange}
					/>
					{errors.name && <p style={{color: "red"}}>{errors.name}</p>}
					<label htmlFor='username' className='form-label'>
						Username
					</label>
					<input
						type='text'
						name='username'
						className='form-control'
						placeholder='Put your username here...'
						value={formValue.username}
						onChange={handleChange}
					/>
					{errors.username && <p style={{color: "red"}}>{errors.username}</p>}
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input
						type='email'
						name='email'
						className='form-control'
						placeholder='Put you email here...'
						value={formValue.email}
						onChange={handleChange}
					/>
					{errors.email && <p style={{color: "red"}}>{errors.email}</p>}
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						type='password'
						name='password'
						className='form-control'
						placeholder='Put your password here...'
						value={formValue.password}
						onChange={handleChange}
					/>
					{errors.password && <p style={{color: "red"}}>{errors.password}</p>}
					{/* <label htmlFor="confirm-password" className="form-label">Confirm password</label>
                    <input type="password" name="confirm-password" className="form-control" placeholder="Confirm your password here..." onChange={handleOnChange} /> */}
					<input type='text' name='role' value='user' onChange={handleChange} hidden></input>
					<button type='submit' className='btn btn-secondary' onClick={handleFormSubmit}>
						Register
					</button>
				</form>
			</div>
			<div className='container'>
				<p>
					You already have an account? Click <a href='/login'>here </a>to log in!
				</p>
			</div>
		</>
	)
}

export default Register