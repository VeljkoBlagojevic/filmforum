import React, {ChangeEvent, useState} from 'react';
import axios from 'axios';
import {Alert, Button, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import './Register.css';
import {Role} from '../../domain/Role';

interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    role: string;
}

const RegisterComponent = () => {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState<RegisterRequest>({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        role: 'USER',
    });

    const [error, setError] = useState<string>('');

    const handleCloseError = () => {
        setError('');
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRoleChange = (event: SelectChangeEvent<unknown>) => {
        setRegisterData((prevData) => ({
            ...prevData,
            role: event.target.value as Role,
        }));
    };

    const register = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/register', registerData);
            navigate('/login');
        } catch (error:any) {
            setError(error.response.data.body.detail);
            console.error(error);
        }
    };


    return (
        <div className="register-form">
            <div className="form-group">
                <TextField
                    required
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={registerData.username}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <TextField
                    required
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={registerData.password}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <TextField
                    required
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={registerData.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <TextField
                    required
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstname"
                    value={registerData.firstname}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <TextField
                    required
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="lastname"
                    value={registerData.lastname}
                    onChange={handleInputChange}
                />
            </div>
            <Select
                name="role"
                label="Role"
                className="select-role"
                value={registerData.role}
                onChange={handleRoleChange}
            >
                <MenuItem value="USER">Regular User</MenuItem>
                <MenuItem value="CRITIC">Movie Critic</MenuItem>
            </Select>
            <div className="btn-container">
                <Button type="submit" className="btn-login" id="register" onClick={register}>
                    Register
                </Button>
            </div>
            <Snackbar
                open={error !== ''}
                autoHideDuration={2500}
                onClose={handleCloseError}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%', maxWidth: '500px' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default RegisterComponent;
