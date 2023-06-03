import {PersonDTO} from './PersonDTO';

export interface ActorDTO {
    creditId: string;
    name: string;
    profilePath: string;
    character: string;
    person: PersonDTO;
}
