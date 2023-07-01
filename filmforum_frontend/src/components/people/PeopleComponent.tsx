import React, { useEffect, useState } from 'react';
import { PersonDTO } from '../../domain/PersonDTO';
import axios from 'axios';
import PersonCardComponent from './PersonCardComponent';
import { Button, TextField } from '@mui/material';
import './People.css';

const PeopleComponent = () => {
    const [people, setPeople] = useState<PersonDTO[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/people', {
                    params: {
                        size: 5,
                        page: currentPage,
                        name: searchTerm, // Pass the search term as a parameter
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTotalPages(response.data.totalPages);
                setPeople(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPeople();
    }, [currentPage, searchTerm]);

    const nextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <div className="search-container">
                <TextField
                    label="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="people-container">
                {people.map((person) => (
                    <PersonCardComponent person={person} key={person.id} />
                ))}
            </div>
            <div className="pagination">
                <Button onClick={previousPage} disabled={currentPage === 0} className="pagination-button">
                    Previous
                </Button>
                <Button
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className="pagination-button"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default PeopleComponent;
