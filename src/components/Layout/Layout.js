import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';

const layout = ( props ) => (
    <Aux>
        <div className={classes.Centered}> Synchronous Sages | Platform Picker </div>
        <hr />
        <main className={classes.Content}>
            {props.children}
        </main>
        <hr />
        <footer>Names, whatever we want here</footer>
    </Aux>
);

export default layout;
