import {Home} from './Home/Home';
import {FC} from 'react';
import {Match3Game} from './Match3Game/Match3Game';

export interface IRoute {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC
}

export const routes: Array<IRoute> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'game-match-3-route',
        title: 'Game',
        path: '/game',
        enabled: true,
        component: Match3Game
    },
]
