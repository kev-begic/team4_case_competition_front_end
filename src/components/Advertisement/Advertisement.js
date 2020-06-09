import React from 'react';

import classes from './Advertisement.module.css';

const advertisement = ( props ) => {
    let advertisementLink = "https://www." + props.streamingPlatform + ".com";
    return (
        <div className={classes.Advertisement}>
            <a href={advertisementLink}>
                <span className={classes.Uppercase}>{props.streamingPlatform}</span>
                <p>
                Click Here for 10% Off!
                </p>
            </a>
        </div>
    );
}

export default advertisement;