import {Gender} from './Gender';

export interface PersonDTO {
    id: number;
    name: string;
    biography: string;
    birthday: string;
    gender: Gender;
    imdb: string;
    placeOfBirth: string;
    profilePath: string;
}
