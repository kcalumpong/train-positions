import React from 'react';
import siteTrainIcon from '../../src/images/site_train.png'

const Nav = () => {

    return (
        <div className="App-header">
            <img src={siteTrainIcon} alt="Train"></img>
            <h1 className="site-title">Train Positions</h1>
        </div>
    )
}

export default Nav;


