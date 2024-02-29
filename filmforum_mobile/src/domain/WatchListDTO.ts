import {UserDTO} from './UserDTO';
import {MovieDTO} from './MovieDTO';

export interface WatchListDTO {
    id: number;
    user: UserDTO;
    movies: MovieDTO[];
}
