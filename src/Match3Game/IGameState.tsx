import {IGem} from './IGem';

export interface IGameState {
    cursor: number;
    table: IGem[];
    score: number;
}
