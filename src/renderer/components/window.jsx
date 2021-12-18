import React, { useState } from 'react';
import Navbar from './navbar';
import { route } from './router';
import './window.scss';


/**
 * This is the main window. All tabs are maintained in this react component.
 * The state keeps track of the current active tab (default: 'home'). Then, the
 * corresponding JSX element is rendered by using the 'router' mapping; When the
 * state changes the tab is also updated. Note that this component should be the
 * main component of the application: Changes are made by updating its state.
 * @param {object} props The react props (here: redundant)
 * @returns The corresponding JSX element.
 */
function Window(props) {
    // the stateful value to apply changes to the current tab
    const [tab, setTab] = useState('home');

    // called when a link in the navbar is clicked
    function onLinkClick(tab) {
        setTab(tab);
    }

    return (
        <div id="wrapper">
            <div id="sidebar" className="collapse collapse-horizontal show">
                <Navbar activeKey={tab} onLinkClick={onLinkClick} />
            </div>
            <div id="content-wrapper" className="container-fluid">
                <nav id="sidebar-button" className="navbar navbar-expand-lg">
                    <div>
                        <button className="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="true" aria-controls="sidebar">
                            <i className="bi bi-grid-fill"></i>
                        </button>
                    </div>
                </nav>
                <div id="content">
                    {route[tab]}
                </div>
            </div>
        </div>
    );
}

export default Window;
