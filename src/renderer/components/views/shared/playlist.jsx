import React from 'react';
import PropTypes from 'prop-types';
import './playlist.scss';


/**
 * One item in the playlist.
 * @param {object} props The react props
 * @return The JSX
 */
export function Item(props) {
    return (
        <div className="playlist-item">
            {props.thumbnail}
            <div className="flex flex-column">
                <span className="playlist-item-title">{props.title}</span>
                <br/>
                <span className="playlist-item-subtitle">{props.subtitle}</span>
            </div>
            <button className={props.btnStyle} onClick={props.onRemove}>
                <i className="bi bi-x-lg"></i>
            </button>
        </div>
    );
}

Item.propTypes = {
    keyName: PropTypes.string.isRequired,
    thumbnail: PropTypes.element,
    title: PropTypes.string,
    subtitle: PropTypes.element,
    onRemove: PropTypes.func
}

Item.defaultProps = {
    thumbnail: <img />,
    title: 'My Playlist Item',
    subtitle: <span>This is a subtitle</span>,
    onRemove: () => {},
}


/**
 * A Playlist. This is a react component for 'queuing' elements with the
 * following properties: A thumbnail, a title and a button.
 * @param {object} props  The react props
 * @returns The JSX
 */
function Playlist(props) {
    function makeJsx() {
        return props.items.map(
            item => <Item {...item} key={item.keyName} btnStyle={props.btnStyle} />
        );
    }

    return (
        <div className="playlist">
            <div className="d-flex justify-content-center gap-3">
                <h3 className="mb-3">Playlist</h3>
                {
                    props.isLoading && (
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )
                }
            </div>
            {makeJsx()}
        </div>
    );
}

Playlist.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
    btnStyle: PropTypes.string,
    isLoading: PropTypes.bool,
}

Playlist.defaultProps = {
    items: [
        {
            keyName: '0',
        }
    ],
    btnStyle: 'btn btn-primary',
    isLoading: true,
}

export default Playlist;
