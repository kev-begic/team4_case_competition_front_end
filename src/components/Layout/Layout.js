import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import PopularContainer from '../../containers/PopularContainer/PopularContainer';
import classes from './Layout.module.css';

const layout = ( props ) => (
    <Aux>
        <div className={classes.Header}>
            <span>Team 4 Logo/Name | Title | Red Ventures Logo</span>
            <PopularContainer />
        </div>
        <hr />
        <main className={classes.Content}>
            {props.children}
        </main>
        <hr />
        <footer>
            <div className={classes.Footer}>
                <span>Copyright</span>
                <span>Created by Synchronous Sages</span>
                <span>RV 2020 Interns</span>
            </div>
        </footer>
    </Aux>
);

export default layout;
