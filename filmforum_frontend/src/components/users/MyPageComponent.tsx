import React, {useEffect, useState} from 'react';
import axios from 'axios';
import UserPageComponent from "./UserPageComponent";
import {useNavigate} from "react-router-dom";

const MyPageContainer = () => {
    const [userId, setUserId] = useState<string>('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/users/currentlyLoggedIn', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setUserId(response.data.id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCurrentUser();
    }, []);

    return
    <UserPageComponent/>;
};

export default MyPageContainer;
