import { getStatic } from '../../static';
import $ from 'jquery';
import path from 'path';
import React from 'react';
import './home.scss';


function ToolCard(props) {
    return (
        <div className="card home-card">
            <div className="card-body">
                <img src={props.imgSrc} className="card-img-top mb-2" style={{width: '150px', height: '150px'}} />
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text">{props.description}</p>
                <button className="btn btn-primary" onClick={props.onClick}>Use Tool</button>
            </div>
        </div>
    );
}


export default function Home(props) {
    return(
        <div id="home-main">
            <h1 id="title">
                Welcome to {" "}
                <span id="home-title-primary">Media</span>
                <span id="home-title-secondary">Downloader</span>
            </h1>
            <div id="home-cards-div">
                <ToolCard
                imgSrc={getStatic(path.join('img', 'youtube.png'))}
                title="YouTube"
                description="A tool for downloading videos from YouTube!"
                onClick={() => $('#link-youtube span').trigger('click')}
                />

                <ToolCard
                imgSrc={getStatic(path.join('img', 'spotify.png'))}
                title="Spotify"
                description="A tool for downloading songs from Spotify!"
                onClick={() => $('#link-spotify span').trigger('click')}
                />
            </div>
        </div>
    );
}
