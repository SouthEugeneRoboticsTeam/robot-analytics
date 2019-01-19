import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Link } from 'react-router-dom';

export const NavigationItem = (props: NavigationItemProps) => {
    const { icon, text, linkTo } = props;
    return (
        <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
                    <ListItemIcon>
                        {React.createElement(icon)}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
            </ListItem>
        </Link>
    )
};

interface NavigationItemProps {
    icon: React.ComponentType
    text: string
    linkTo: string
}
