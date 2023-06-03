import {ActorDTO} from "../../domain/ActorDTO";
import React from "react";
import ActorCardComponent from "./ActorCardComponent";
import "./Cast.css";

interface CastComponentProps {
    cast: ActorDTO[];
}

const CastComponent = ({cast}: CastComponentProps) => {
    return (
        <div className="cast-container">
            {cast.map(actor => <ActorCardComponent actor={actor} key={actor.creditId}/>)}
        </div>
    );
};

export default CastComponent;
