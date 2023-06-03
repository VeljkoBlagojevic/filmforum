import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {UserDTO} from './domain/UserDTO';
import NavbarComponent from './components/navbar/NavbarComponent';
import LoginComponent from './components/auth/LoginComponent';
import RegisterComponent from './components/auth/RegisterComponent';
import MoviesComponent from './components/movies/MoviesComponent';
import MovieDetailsComponent from "./components/movies/MovieDetailsComponent";
import PersonDetailsComponent from "./components/people/PersonDetailsComponent";
import PeopleComponent from "./components/people/PeopleComponent";
import GenreComponent from "./components/genres/GenreComponent";
import UserPageComponent from "./components/users/UserPageComponent";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [user, setUser] = useState<UserDTO | undefined>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <NavbarComponent isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                <div className="body">
                    <Routes>
                        <Route
                            path="/"
                            element={<LoginComponent setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}
                        />
                        <Route
                            path="/login"
                            element={<LoginComponent setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />}
                        />
                        <Route path="/register" element={<RegisterComponent />} />
                        <Route path="/movies" element={<MoviesComponent />} />
                        <Route path="/movies/:movieID" element={<MovieDetailsComponent/>} />
                        <Route path="/people" element={<PeopleComponent/>} />
                        <Route path="/people/:personID" element={<PersonDetailsComponent/>} />
                        <Route path="/genres/:genreID" element={<GenreComponent/>} />
                        <Route path="/users/:userID" element={<UserPageComponent />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
