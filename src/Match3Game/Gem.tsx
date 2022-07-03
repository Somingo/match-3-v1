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
    onSwapped: () => void,
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

const swappingLeftAnimationKeyframes = keyframes`
  0% {
    transform: scale(100%, 100%);
    left: 100%;
    top: 0;
  }
  50% {
    transform: scale(75%, 75%);
    left: 50%;
    top: 12%;
  }
  100% {
    transform: scale(100%, 100%);
    left: 0;
    top: 0;
  }
`;

const swappingLeftAnimation: SxProps<Theme> = {animation: swappingLeftAnimationKeyframes + ' 0.2s ease-in-out '}

const swappingRightAnimationKeyframes = keyframes`
  0% {
    transform: scale(100%, 100%);
    left: -100%;
    top: 0;
  }
  50% {
    transform: scale(125%, 125%);
    left: -50%;
    top: -12%;
  }
  100% {
    transform: scale(100%, 100%);
    left: 0;
    top: 0;
  }
`;

const swappingRightAnimation: SxProps<Theme> = {animation: swappingRightAnimationKeyframes + ' 0.2s ease-in-out '}

const swappingAnimations: SxProps<Theme>[] = [{}, swappingLeftAnimation, swappingRightAnimation];

export const Gem: FC<GemProps> = ({gem: {type, points, removing, id, swapping}, cursorLeft, cursorRight, onRemove, onSwapped}) => {
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
        ...swappingAnimations[swapping],
    }} onAnimationEnd={() => {
        if (removing) onRemove();
        if (swapping) onSwapped();
    }}>{id} - {points}</Box></Box>
}
