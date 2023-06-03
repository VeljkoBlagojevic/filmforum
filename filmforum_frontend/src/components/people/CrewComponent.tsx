import React from "react";
import {CrewMemberDTO} from "../../domain/CrewMemberDTO";
import CrewMemberCardComponent from "./CrewMemberCardComponent";
import "./Crew.css";

interface CrewComponentProps {
    crew: CrewMemberDTO[];
}

const CrewComponent: React.FC<CrewComponentProps> = ({crew}) => {
    return (
        <div className="crew-container">
            {crew.map(crewMember => <CrewMemberCardComponent crewMember={crewMember} key={crewMember.creditId}/>)}
        </div>
    );
};

export default CrewComponent;
