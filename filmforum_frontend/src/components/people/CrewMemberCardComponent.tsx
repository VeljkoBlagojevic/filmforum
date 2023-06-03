import React from 'react';
import PersonCardComponent from "./PersonCardComponent";
import {CrewMemberDTO} from "../../domain/CrewMemberDTO";
import "./CrewMemberCard.css"

interface CrewMemberCardComponentProps {
    crewMember: CrewMemberDTO;
}

const ActorCardComponent: React.FC<CrewMemberCardComponentProps> = ({crewMember}) => {
    return (
        <div className="crew-card">
            <PersonCardComponent person={crewMember.person} key={crewMember.creditId}/>
            <div className="job">{crewMember.job}</div>
        </div>
    );
};

export default ActorCardComponent;
