import React, {FC} from 'react';
import {Box, SxProps, Theme} from '@mui/material';

export interface IGem {
    type: number;
    points: number;
}

const cursorLeftSx: SxProps<Theme> = {
    borderColor: '#000 #fff #000 #000',
};

const cursorRightSx: SxProps<Theme> = {
    borderColor: '#000 #000 #000 #fff',
};

export const gemColors = ['#fff', '#f00', '#0f0', '#00f', '#f0f']

export interface GemProps {
    gem: IGem,
    cursorLeft: boolean,
    cursorRight: boolean
}

export const Gem: FC<GemProps> = ({gem: {type, points}, cursorLeft, cursorRight}) => {
    return <Box sx={{
        flex: '14% 0 0', paddingTop: '14%', backgroundColor: gemColors[type], border: '1px solid #fff',
        ...(cursorLeft ? cursorLeftSx : {}),
        ...(cursorRight ? cursorRightSx : {}),
    }}/>
}
