import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { RegisterData } from '../models/register';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { register } from '../redux/actions/authAction';

const initState: RegisterData = {
    email: '',
    password: '',
    confirmPassword: '',
};

const Register: React.FC = () => {
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    console.log('auth', auth);

    const [data, setData] = useState<RegisterData>(initState);
    const { email, password, confirmPassword } = data;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(register(data));
    };

    return (
        <div className="container h-screen px-6 py-4 mx-auto flex justify-center items-center gap-16">
            <div className="w-[40rem] rounded-lg mx-auto bg-primary shadow p-10 flex flex-col gap-6">
                <h3 className="text-2xl font-medium text-start">Register</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-lg font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-lg font-medium">
                            Password
                        </label>
                        <input
                            type="text"
                            id="password"
                            className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                            placeholder="Enter password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="text-lg font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="text"
                            id="confirmPassword"
                            className="py-3 px-4 block w-full rounded-md text-sm border border-gray-300 focus:outline-fuchsia-400"
                            placeholder="Enter password"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full flex items-center justify-between gap-5 mt-3">
                        <p>
                            Already have an account?
                            <Link to="/login" className="ml-1 text-fuchsia-400 hover:underline">
                                Login
                            </Link>
                        </p>
                        <button
                            type="submit"
                            className="w-32 text-center py-3 px-4 rounded-md items-center text-sm font-semibold border border-transparent bg-fuchsia-800 text-white hover:bg-fuchsia-700">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
