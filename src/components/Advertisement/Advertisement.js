import React from 'react';

import classes from './Advertisement.module.css';

const advertisement = ( props ) => {
    let advertisementLink = "https://www." + props.streamingPlatform + ".com";
    if ( props.streamingPlatform === 'amazon_prime') {
        advertisementLink = "https://www.amazon.com/amazonprime";
        return (
            <div className={classes.Amazon}>
                <div>
                    <a href={advertisementLink} target="_blank">
                        <span className={classes.Uppercase}>"Amazon Prime"</span>
                        <p>
                        Click Here for 10% Off!
                        </p>
                    </a>
                </div>
            </div>
        );
    } else if (props.streamingPlatform === 'hbo') {
      return (
          <div className={classes.HBO}>
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
    } else {
      return (
          <div className={classes.Netflix}>
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


}

export default advertisement;
