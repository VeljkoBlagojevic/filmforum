import {Gender} from './Gender';
import {PersonDTO} from './PersonDTO';

export interface CrewMemberDTO {
    creditId: string;
    gender: Gender;
    name: string;
    profilePath: string;
    department: string;
    job: string;
    person: PersonDTO;
}
