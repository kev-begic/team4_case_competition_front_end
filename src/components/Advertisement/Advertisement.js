import React from 'react';

import classes from './Advertisement.module.css';

const advertisement = ( props ) => {
    let advertisementLink = "https://www." + props.streamingPlatform + ".com";
    if ( props.streamingPlatform === 'amazon_prime') {
        advertisementLink = "https://www.amazon.com/amazonprime";
    }
    
    return (
        <div className={classes.Advertisement}>
            <div>
                <a href={advertisementLink} target="_blank">
                    <span className={classes.Uppercase}>{props.streamingPlatform}</span>
                    <p>
                    Click Here for 10% Off!
                    </p>
                </a>
            </div>
        </div>
    );
}

export default advertisement;