import React from 'react';

import Aux from '../../../hoc/Aux/Aux';

const searchButton = (props) => (
    <Aux>
        <button
            onClick={props.buttonHandler}>
            Click here!
        </button>
    </Aux>
)

export default searchButton;