import React, {FC} from 'react';
import {Box, keyframes, SxProps, Theme} from '@mui/material';
import {GEM_COLORS} from './config';
import {IGem} from './IGem';

const cursorLeftSx: SxProps<Theme> = {
    borderColor: '#000 transparent #000 #000',
};

const cursorRightSx: SxProps<Theme> = {
    borderColor: '#000 #000 #000 transparent',
};

export interface GemProps {
    gem: IGem,
    cursorLeft: boolean,
    cursorRight: boolean,
    onRemove: () => void,
}

const removingAnimationKeyframes = keyframes`
  0% {
    transform: scale(100%, 100%);
    opacity: 1;
    left: 0;
    top: 0;
  }
  100% {
    transform: scale(0%, 0%);
    left: 25%;
    top: 25%;
    opacity: 0;
  }
`;

const removingAnimation: SxProps<Theme> = {animation: removingAnimationKeyframes + ' 1s ease '}

export const Gem: FC<GemProps> = ({gem: {type, points, removing, id}, cursorLeft, cursorRight, onRemove}) => {
    return <Box sx={{
        flex: '14% 0 0',
        paddingTop: '14%',
        border: '1px solid transparent',
        position: 'relative',
        ...(cursorLeft ? cursorLeftSx : {}),
        ...(cursorRight ? cursorRightSx : {}),
    }}><Box sx={{
        position: 'absolute',
        width: '90%',
        height: '90%',
        left: '5%',
        top: '5%',
        backgroundColor: GEM_COLORS[type],
        ...(removing ? removingAnimation : {}),
    }} onAnimationEnd={() => {
        if (removing) onRemove();
    }}>{id} - {points}</Box></Box>
}
