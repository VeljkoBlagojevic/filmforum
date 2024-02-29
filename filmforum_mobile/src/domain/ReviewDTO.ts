import {UserDTO} from './UserDTO';
import {MovieDTO} from './MovieDTO';

export interface ReviewDTO {
    id: number;
    content: string;
    author: UserDTO;
    date: string; // Assuming LocalDate is converted to string in the same format as ISO 8601 date format
    movie: MovieDTO;
    rating: number;
}
