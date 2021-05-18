import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DecisionDialog from '../../decisionDialog/DecisionDialog';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export interface IMenuBarProps {
    viewLabel: string;
    onWizardRestart: () => void;

}

const menuBarStyles = makeStyles((theme: Theme) =>
  createStyles({
        title: {            
            flexGrow: 1,
        },
        appBarSpacer: theme.mixins.toolbar
    })
);

const MenuBar = (props: IMenuBarProps) => {

    const {viewLabel, onWizardRestart} = props;

    const classes = menuBarStyles();

    //#region Menu state
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   
    const handleMoreButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleCloseMoreMenu = () => {
        setAnchorEl(null);
    };

    const handleResetClicked = () => {
        setAnchorEl(null);
        setRestartDialogOpen(true);
    };

    //#endregion

    //#region Reset dialog state
    const [restartDialogOpen, setRestartDialogOpen] = React.useState<boolean>(false);

    const handleRestartCancel = () => {
        setRestartDialogOpen(false);
    };

    const handleRestartConfirm = () => {
        onWizardRestart();
    };

    //#endregion

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {viewLabel}
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
                        <MenuItem onClick={handleResetClicked}>Reset configuration</MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>
            <DecisionDialog
                open={restartDialogOpen}
                title="Restart the configuration"
                text="Confirm the restart. All changes will be lost!"
                onCancelClick={handleRestartCancel}
                onConfirmClick={handleRestartConfirm}            
            />
            <div className={classes.appBarSpacer}></div>
        </React.Fragment>
    )


}

export default MenuBar;