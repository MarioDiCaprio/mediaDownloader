import React, { Component } from 'react';
import Home from './views/home';
import YouTube from './views/youtube';
import Spotify from './views/spotify';


/**
 * A router that maps a tab name to the corresponding JSX element.
 * Tabs include: 'home', 'youtube', 'spotify'.
 */
export const route = {
    home: <Home />,
    youtube: <YouTube />,
    spotify: <Spotify />,
};
