import React from 'react';

import classes from './ToolBar.css';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <h1 style={{color:'white',    fontFamily: "emoji"
        }}>My Houses</h1>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;