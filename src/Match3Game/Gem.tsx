import React, {FC} from 'react';
import {Box, SxProps, Theme} from '@mui/material';
import {GEM_COLORS} from './config';
import {IGem} from './IGem';

const cursorLeftSx: SxProps<Theme> = {
    borderColor: '#000 #fff #000 #000',
};

const cursorRightSx: SxProps<Theme> = {
    borderColor: '#000 #000 #000 #fff',
};

export interface GemProps {
    gem: IGem,
    cursorLeft: boolean,
    cursorRight: boolean
}

export const Gem: FC<GemProps> = ({gem: {type, points}, cursorLeft, cursorRight}) => {
    return <Box sx={{
        flex: '14% 0 0', paddingTop: '14%', backgroundColor: GEM_COLORS[type], border: '1px solid #fff',
        ...(cursorLeft ? cursorLeftSx : {}),
        ...(cursorRight ? cursorRightSx : {}),
    }}/>
}
