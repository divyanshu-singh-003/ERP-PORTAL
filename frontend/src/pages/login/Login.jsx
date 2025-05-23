import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import backgroundImage from "../../assets/bg.png"; // Import the background image

const Login = () => {
	const [username, setUsername] = useState("");
	const [email, setUseremail] = useState("");

	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username , email , password);
	};

	return (
		<div className='p-4 h-screen flex items-center justify-center custom-container bg-cover bg-center' style={{backgroundImage: `url(${backgroundImage})`}}>

		


		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'></span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Email</span>
						</label>
						<input
							type='text'
							placeholder='Enter email'
							className='w-full input input-bordered h-10'
							value={email}
							onChange={(e) => setUseremail(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					
					<Link to='/admin/marks' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						Are you Admin ?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-8' disabled={loading}>
							{loading ? <span className='loading loading-spinner '></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
		</div>
	);
};
export default Login;
