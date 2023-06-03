import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './Navbar.css';
import axios from "axios";
import { UserDTO } from '../../domain/UserDTO';

interface NavbarProps {
    isLoggedIn: boolean;
    isAdmin: boolean;
}

const NavbarComponent: React.FC<NavbarProps> = ({ isLoggedIn, isAdmin }) => {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get<UserDTO>('http://localhost:8080/api/v1/users/currentlyLoggedIn', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        if (isLoggedIn) {
            fetchCurrentUser();
        }
    }, [isLoggedIn]);

    function deleteToken() {
        localStorage.clear();
    }

    return (
        <>
            {isLoggedIn && (
                <div className="navbar1">
                    <div className="navbar-elements">
                        <Link to="/login">
                            <Button onClick={deleteToken} className="btn-navbar">Logout</Button>
                        </Link>
                        <Link to="/people">
                            <Button className="btn-navbar">People</Button>
                        </Link>
                        <Link to="/movies">
                            <Button className="btn-navbar">Movies</Button>
                        </Link>
                        {!isAdmin && (
                            <Link to={`/users/${user?.id}`}>
                                <Button className="btn-navbar">My page</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
            {!isLoggedIn && (
                <div className="navbar1">
                    <Link to="/register">
                        <Button className="btn-navbar">Register</Button>
                    </Link>
                    <Link to="/login">
                        <Button className="btn-navbar">Login</Button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default NavbarComponent;
