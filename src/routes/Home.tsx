import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { TeamListContainer } from "../containers/TeamListContainer";

export const Home = () => (
    <>
        <Drawer variant="permanent" >
            <TeamListContainer />
        </Drawer>
    </>
);
