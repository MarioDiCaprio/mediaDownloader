import React from "react";
import PropTypes from "prop-types";
import ProgressBar from "./progressbar"


function DownloadQueue(props) {
    function getJsx() {
        let jsx = [];
        let i = 0;
        for (let item of props.items) {
            jsx.push(
                <div key={i++} className="vstack gap-2 mb4">
                    {item.title}
                    <ProgressBar progress={item.progress}/>
                </div>
            );
        }
        return jsx;
    }

    return (
        <div>
            {getJsx()}
        </div>
    );
}

DownloadQueue.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.element,
            progress: PropTypes.number
        })
    ),
}

DownloadQueue.defaultProps = {
    items: [
        {
            title: <span>My Item:</span>,
            progress: 50
        }
    ],
}

export default DownloadQueue;
