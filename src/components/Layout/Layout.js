import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.module.css';

const layout = ( props ) => (
    <Aux>
<<<<<<< HEAD
        <div className={classes.Centered}>Team 4 Logo/Name | Title | Red Ventures Logo</div>
=======
        <div className={classes.Centered}> Synchronous Sages | Platform Picker </div>
        <img src="https://rb.gy/g0byiw"></img>
>>>>>>> 93977e7621d0b49412de776e58b76eed64ea75f4
        <hr />
        <main className={classes.Content}>
            {props.children}
        </main>
        <hr />
        <footer>Names, whatever we want here</footer>
    </Aux>
);

export default layout;
