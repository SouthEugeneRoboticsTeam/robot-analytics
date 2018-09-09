import { h } from 'preact';
import Drawer from 'preact-material-components/Drawer';
import TopAppBar from 'preact-material-components/TopAppBar';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/TopAppBar/style.css';

export const Home = () => (
    <div id="Home">
        <TopAppBar onNav={null}>
            <TopAppBar.Row>
                <TopAppBar.Section>
                    <TopAppBar.Title>
                        Robot Analytics
                    </TopAppBar.Title>
                </TopAppBar.Section>
            </TopAppBar.Row>
        </TopAppBar>
        <Drawer.PermanentDrawer spacer style={{ height: '100vh' }}>
            <Drawer.DrawerContent>
            </Drawer.DrawerContent>
        </Drawer.PermanentDrawer>
    </div>
);
