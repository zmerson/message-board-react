import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { buttonTW } from '../../styles/styles';
import Container from '../templates/container';
const CreateAccount = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
    });
    // const { authenticated, signIn } = useAuth()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/create-account', formData);
            console.log(response.data); // User data from the server (e.g., user ID, name, etc.)
        }
        catch (error) {
            console.log('Error creating user:', error.response.data);
        }
        navigate('/auth');
    };
    return (React.createElement("div", { className: 'flex flex-col mt-10 items-center align-center jusutify-center' },
        React.createElement(Container, null,
            React.createElement("form", { onSubmit: handleSubmit, className: 'min-fit' },
                React.createElement("h2", { className: 'text-2xl mb-2\r\n              ' }, "Create a New Account"),
                React.createElement("div", null,
                    React.createElement("label", null, "Email"),
                    React.createElement("input", { className: 'w-full bg-zinc-200 text-slate-950 rounded', placeholder: "Email", type: "email", name: "email", onChange: handleChange })),
                React.createElement("div", null,
                    React.createElement("label", null, "Username"),
                    React.createElement("input", { className: 'w-full bg-zinc-300 text-slate-950 rounded', "w-max-100": true, placeholder: "Username", type: "text", name: "name", onChange: handleChange })),
                React.createElement("div", null,
                    React.createElement("label", null, "Password"),
                    React.createElement("input", { className: 'w-full bg-zinc-500 text-slate-950 rounded', placeholder: "Password", type: "password", name: "password", onChange: handleChange })),
                React.createElement("button", { className: buttonTW + " mt-5", type: "submit" }, "Register")))));
};
export default CreateAccount;
