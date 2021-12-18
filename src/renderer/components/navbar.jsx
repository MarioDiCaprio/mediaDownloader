import React from 'react';
import PropTypes from 'prop-types';
import './navbar.scss';


/**
 * A list containing all items in the navbar. The list is made of objects
 * that have the following properties:
 * 
 * key: The tab's ID
 * 
 * text: The tab's title/description
 */
export const items = [
    {
        key: 'home',
        text: 'Home',
    },
    {
        key: 'youtube',
        text: 'YouTube',
    },
    {
        key: 'spotify',
        text: 'Spotify',
    }
];


/**
 * The Sidebar for the app. The tabs are an unordered list, where each
 * list element has the following very intuitive structure:
 * <ul>
 *     <li key="home">
 *         <a id="link-home">
 *             <span>Home</span>
 *         </a>
 *     </li>
 *     ...
 * </ul>
 * @param {object} props The react props (see Navbar.propTypes)
 * @returns The corresponding JSX element
 */
function Navbar(props) {
    function onClick(event, tab) {
        event.preventDefault();
        props.onLinkClick(tab);
    }

    // render all items as JSX and put them in a list
    const itemsJsx = [];
    for (let item of items) {
        let cls = (item.key == props.activeKey)? 'nav-link active' : 'nav-link';
        itemsJsx.push(
            <li key={item.key}>
                <a id={"link-" + item.key} className={cls} onClick={event => onClick(event, item.key)}>
                    <span>{item.text}</span>
                </a>
            </li>
        );
    }

    return (
        <div id="navbar" className="d-flex flex-column bg-dark text-light collapse">
            <div className="sidebar-header">
                <h3>MediaDownloader</h3>
            </div>
            <hr/>
            <div className="nav-menu">
                <ul className="nav nav-pills flex-column">
                    {itemsJsx}
                </ul>
            </div>
        </div>
    );
}

/**
 * The react props. An object that contains one key, namely 'activeKey'.
 * This is one of the following strings: 'home', 'youtube', 'spotify'.
 * The prop 'onLinkClick' is a function that is called when a link is clicked.
 * It accepts one parameter, the tab's name.
 */
Navbar.propTypes = {
    activeKey: PropTypes.string,
    onLinkClick: PropTypes.func,
}

Navbar.defaultProps = {
    activeKey: '',
    onLinkClick: tab => {},
}

export default Navbar;
