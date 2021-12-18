import React from 'react';
import PropTypes from 'prop-types';


function ProgressBar(props) {
    return (
        <div className="progress">
            <div
            className={(props.progress >= 100)? "progress-bar" : "progress-bar progress-bar-striped progress-bar-animated"}
            role="progressbar"
            style={{width: props.progress + '%'}}
            aria-valuenow={'' + props.progress}
            aria-valuemin="0"
            aria-valuemax="100"
            ></div>
        </div>
    );
}

ProgressBar.propTypes = {
    progress: PropTypes.number,
}

ProgressBar.defaultProps = {
    progress: 0,
}

export default ProgressBar;
