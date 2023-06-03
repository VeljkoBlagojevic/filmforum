import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Alert, Button, Snackbar, TextField} from '@mui/material';
import './Login.css';

interface LoginComponentProps {
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setIsAdmin: (isAdmin: boolean) => void;
}

const LoginComponent = ({ setIsLoggedIn, setIsAdmin }: LoginComponentProps) => {
    const navigate = useNavigate();

    const [error, setError] = useState<string>('');

    const handleCloseError = () => {
        setError('');
    };

    useEffect(() => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }, []);

    const login = async () => {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            setIsLoggedIn(true);
            setIsAdmin(response.data.role === 'ADMIN');
            navigate('/movies');
        } catch (error: any) {
            console.error(error);
            setError(error.response.data.body.detail);
        }
    };


    return (
        <div className="login-form">
            <div className="form-group">
                <TextField required type="text" className="form-control" placeholder="User Name" id="username" />
            </div>
            <div className="form-group">
                <TextField required type="password" className="form-control" placeholder="Password" id="password" />
            </div>
            <div className="btn-container">
                <Button type="submit" className="btn-login" id="login" onClick={login}>
                    Login
                </Button>
            </div>
            <Snackbar open={error !== ''} autoHideDuration={2500} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default LoginComponent;
