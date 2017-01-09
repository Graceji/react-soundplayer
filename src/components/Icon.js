import React from 'react';

export const SoundCloudLogoSVG = () => (

);

export const ButtonIconSVG = (props) => (
  <svg
    className="sb-soundplayer-play-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
  >
    {props.children}
  </svg>
);

// play
export const PlayIconSVG = () => (
  <ButtonIconSVG>
    <path d="M0 0 L32 16 L0 32 z" />
  </ButtonIconSVG>
);

// pause
export const PauseIconSVG = () => (
  <ButtonIconSVG>
    <path d="M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z" />
  </ButtonIconSVG>
);