import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { ResolveViewLabel, AvailableViews } from '../AvailableViews';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';

export interface IMenuBarProps {
    currentView: AvailableViews;
    showView: (availableView: AvailableViews) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        title: {            
            flexGrow: 1,
        },
        appBarSpacer: theme.mixins.toolbar
    })
);

/**
 * Menu bar that displays the title of the step and the allows the reset of the configuration
 * 
 * @param props 
 * @returns 
 */
export const MenuBar = (props: IMenuBarProps) => {

    const {currentView, showView} = props;
    const classes = useStyles();

    //#region State for the menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isConfigurationResetDialogOpen, setIsConfigurationResetDialogOpen] = React.useState<boolean>(false);

    const handleMoreButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleCloseMoreMenu = () => {
        setAnchorEl(null);
    };

    const handleResetConfiguration = () => {
        setAnchorEl(null);
        setIsConfigurationResetDialogOpen(true);
    };

    const resetConfiguration = () => {
        // This will reset the configuration when the user starts a new configuration on the WelcomeView
        showView(AvailableViews.WelcomeView);
    };

    //#endregion

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {ResolveViewLabel(currentView)}
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleMoreButtonClicked}>
                        <MoreIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={
                            {
                                vertical: 'top',
                                horizontal: 'right',
                            }
                        }
                        keepMounted
                        transformOrigin={
                            {
                                vertical: 'top',
                                horizontal: 'right',
                            }
                        }
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMoreMenu}
                    >
                        <MenuItem onClick={handleResetConfiguration}>Reset configuration</MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>
            <DecisionDialog
                handleAccept={resetConfiguration}
                handleCancel={() => {setIsConfigurationResetDialogOpen(false);}}
                isOpen={isConfigurationResetDialogOpen}
                title={"Reset configuration"}
                text={"Confirm the reset of the current configuration. All unsaved data will be deleted!"}
            />
            <div className={classes.appBarSpacer}></div>
        </React.Fragment>
    );
}