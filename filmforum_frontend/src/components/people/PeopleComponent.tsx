import React, {useEffect, useState} from 'react';
import {PersonDTO} from "../../domain/PersonDTO";
import axios from "axios";
import PersonCardComponent from "./PersonCardComponent";
import {Button} from "@mui/material";
import "./People.css";

const PeopleComponent = () => {
    const [people, setPeople] = useState<PersonDTO[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);


    useEffect(() => {
        const fetchPeopleDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/people`, {
                    params: {
                        size: 5,
                        page: currentPage,
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
        fetchPeopleDetails();
    }, [currentPage]);

    const nextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const previousPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    return (
        <div>
            <div className="pagination">
                <Button
                    onClick={previousPage}
                    disabled={currentPage === 0}
                    className="pagination-button"
                >
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
            <div className="people-container">
                {people.map(person => <PersonCardComponent person={person} key={person.id}/>)}
            </div>

        </div>
    );
};

export default PeopleComponent;