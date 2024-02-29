import {ActorDTO} from './ActorDTO';
import {CrewMemberDTO} from './CrewMemberDTO';
import {Genre} from "./Genre";

export interface MovieDTO {
    id: number;
    adult: boolean;
    backdropPath: string;
    budget: number;
    genres: Genre[];
    homepage: string;
    imdb: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    releaseDate: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    cast: ActorDTO[];
    crew: CrewMemberDTO[];
}
