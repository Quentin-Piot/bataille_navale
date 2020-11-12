import React from 'react';
import './NavigationBar.scss';

function NavigationBar(props : any) {
    return(
        <div className = "navigation-bar">
            <div className = "app-name vertical-align">Battleship</div>
        </div>
    );
}

export default NavigationBar;