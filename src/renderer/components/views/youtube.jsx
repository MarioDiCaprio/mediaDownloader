import $ from 'jquery';
import fs from 'fs';
import path from 'path';
import { dialog } from '@electron/remote';
import ytdl from 'ytdl-core';
import React, { useState } from 'react';
import Playlist from './shared/playlist';
import DownloadQueue from './shared/downloadqueue';
import './youtube.scss';


export default function YouTube(props) {
    const [state, setState] = useState({
        items: [],
        key: 0
    });
    const [isPlaylistLoading, setIsPlaylistLoading] = useState(false);
    const [dlItems, setDlItems] = useState([]);
    const [isDlFinished, setIsDlFinished] = useState(true);


    function chooseDlDir() {
        dialog.showOpenDialog({
            buttonLabel: 'Choose Directory',
            properties: ['openDirectory']
        })
        .then(data => {
            if (data.filePaths.length == 1)
                $('#yt-download-dir').val(data.filePaths[0]);
        });
    }

    function removeVideo(key) {
        let tmp = [];
        for (let item of state.items) {
            if (item.keyName != key) {
                tmp.push(item);
            }
        }
        setState({
            items: tmp,
            key: state.key + 1
        });
    }

    function addVideo() {
        const link = $('#yt-input-link').val();
        $('#yt-input-link').val('');
        // check if given url is valid
        if (!ytdl.validateURL(link)) {
            alert('Please enter a valid link!');
            return;
        }
        // add video to playlist
        setIsPlaylistLoading(true);
        ytdl
        .getInfo(link)
        .then(info => {
            setState({
                items: [
                    ...state.items,
                    {
                        keyName: '' + state.key,
                        thumbnail:  <img
                                    src={info.player_response.videoDetails.thumbnail.thumbnails[0].url} alt="thumbnail"
                                    style={{borderRadius: '5px'}}
                                    />,
                        title: info.videoDetails.title,
                        subtitle:   <span>
                                        <img
                                        src={info.videoDetails.author.thumbnails[0].url}
                                        style={{borderRadius: '50%', width: '35px', height: '35px', marginRight: '5px'}}
                                        />
                                        {info.videoDetails.author.name}
                                    </span>,
                        authorImg:  <img
                                    src={info.videoDetails.author.thumbnails[0].url}
                                    style={{borderRadius: '50%', width: '35px', height: '35px', marginRight: '5px'}}
                                    />,
                        url: link,
                        onRemove: () => removeVideo(state.key),
                    }
                ],
                key: state.key + 1
            });
            setIsPlaylistLoading(false);
        });
    }

    function download() {
        const links = state.items;
        const dldir = $('#yt-download-dir').val();
        // check invalid inputs
        if (links.length == 0) {
            alert('Playlist is empty!');
            return;
        } else if (dldir == '') {
            alert('Please select a download directory!');
            return;
        }
        // download if everything is ok
        let downloaded = 0;
        let itemIndex = 0;
        let items = [];
        const fileFormat = $('#yt-select-format').val();
        const dlOptions = (fileFormat == 'mp4')? {} : {filter: 'audioonly'};
        setState({items: [], key: 0})
        setIsDlFinished(false);
        for (let link of links) {
            const index = itemIndex++;
            const item = {
                title: <span>{link.authorImg}{link.title}</span>,
                progress: 0,
                total: 0,
            };
            items.push(item);
            setDlItems([...items]);

            let chunks = 0;
            let wStream = fs.createWriteStream(path.join(dldir, link.title + '.' + fileFormat));
            ytdl(link.url, dlOptions)
                .on('response', res => {
                    item.total = parseInt(res.headers['content-length'], 10);
                })
                .on('data', chunk => {
                    chunks += chunk.length;
                    let progress = Math.round(chunks / item.total * 100);
                    if (progress > items[index].progress) {
                        items[index].progress = progress;
                        setDlItems([...items]);
                    }
                })
                .on('end', () => {
                    items[index].progress = 100;
                    setDlItems(items);
                    downloaded++;
                })
                .pipe(wStream);
        }

        // promise resolves when all videos have been downloaded
        new Promise( resolve => {
            const checkDownload = () => {
                if (downloaded < links.length) {
                    setTimeout(checkDownload, 100);
                } else {
                    resolve();
                }
            };
            checkDownload();
        }).then(() => {
            setIsDlFinished(true);
        });
    }

    return (
        <div className="container-fluid text-center">

            <h1 id="title">
                <span className="yt-text">YouTube</span>Downloader
            </h1>

            <div id="yt-main" className="container-fluid vstack gap-3">

                <div id="yt-input-link-wrapper" className="input-group d-flex justify-content-center">
                    <div className="form-floating">
                        <input id="yt-input-link" className="form-control stdText" placeholder="..." spellCheck="false" />
                        <label htmlFor="yt-link" className="stdText">Video Link</label>
                    </div>
                    <button className="btn stdText yt-btn" onClick={addVideo}>Add</button>
                </div>

                <Playlist items={state.items} btnStyle="btn yt-btn" isLoading={isPlaylistLoading}/>

                <div id="yt-download-wrapper" className="input-group d-flex justify-content-center">
                    <button className="btn stdText yt-btn" onClick={chooseDlDir}>...</button>
                    <div id="yt-download-input-wrapper" className="form-floating">
                        <input id="yt-download-dir" className="form-control stdText" placeholder="..." spellCheck="false" />
                        <label htmlFor="yt-link" className="stdText">Download Directory</label>
                    </div>
                    <select id="yt-select-format" className="form-select" style={{maxWidth: '85px'}}>
                        <option selected value="mp4">mp4</option>
                        <option value="mp3">mp3</option>
                    </select>
                    <button className="btn stdText yt-btn" onClick={download} data-bs-toggle="modal" data-bs-target="#yt-dl-modal">
                        Download
                    </button>
                </div>

            </div>

            <div className="modal fade" id="yt-dl-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="yt-dl-modal-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="yt-dl-modal-label">
                                {isDlFinished? "Download Finished" : "Downloading..."}
                            </h5>
                        </div>
                        <div className="modal-body">
                            <DownloadQueue items={dlItems}/>
                        </div>
                        <div className="modal-footer">
                            <button
                            type="button"
                            data-bs-dismiss="modal"
                            className={isDlFinished? "btn btn-secondary" : "btn btn-secondary disabled"}
                            onClick={() => setDlItems([])}
                            >Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
