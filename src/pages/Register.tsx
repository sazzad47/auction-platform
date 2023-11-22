import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { RegisterData } from '../models/register';
import { useAppDispatch } from '../redux/hooks';
import { register } from '../redux/actions/authAction';
import InputLabel from '../components/common/InputLabel';
import InputField from '../components/common/InputField';

interface RegisterDataWithIndexSignature extends RegisterData {
    [key: string]: string;
}

const initState: RegisterDataWithIndexSignature = {
    email: '',
    password: '',
    confirmPassword: '',
};

const inputFields = [
    { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { id: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' },
    { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Enter password' },
];

const Register: React.FC = () => {
    const dispatch = useAppDispatch();

    const [data, setData] = useState<RegisterDataWithIndexSignature>(initState);

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
                    {inputFields.map((field) => (
                        <div className="flex flex-col gap-2" key={field.id}>
                            <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                            <InputField
                                type={field.type}
                                id={field.id}
                                value={data[field.id]}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
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
