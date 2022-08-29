import React,{Fragment} from "react";

import Toolbar from "../../components/ToolBar/ToolBar";
import classes from "./Layout.css";

const layout = (props) => {
    return (
        <Fragment>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
    );
}
    

export default layout;