import React from 'react';
import './NavigationBar.scss';

function NavigationBar(props : any) {
    return(
        <div className = "navigation-bar">
            <div className = "app-name vertical-align">Battleship</div>
            <div className = "langages vertical-align">
                <button>Français</button>
                <button>Anglais</button>
            </div>
        </div>
    );
}

export default NavigationBar;