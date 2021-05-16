import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { AvailableViews, getInitalConfiguration, ResolveViewLabel } from '../AvailableViews';
import {StepperViewProps} from '../wizard/Wizard';
import { ConfigurationFileInput } from './ConfigurationFileInput';
import './ConfigurationImportView.css';
import IConfiguration from '../../interfaces/IConfiguration';
import SyntaxHighlighter from 'react-syntax-highlighter';
import lightfair from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';
import { Alert, AlertTitle } from '@material-ui/lab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { DecisionDialog } from '../decisionDialog/DecisionDialog';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {            
            flexGrow: 1,
        },
        appBarSpacer: theme.mixins.toolbar
    })
);

/**
 * View for the configuration import
 */
export const ConfigurationImportView = (props: StepperViewProps) => {

    const {showView, handleConfigurationUpdate, views} = props;

    const classes = useStyles();

    const handleFileChange = (filename: string, jsonData: string) => {
        try{
            const loadedConfig : IConfiguration = JSON.parse(jsonData);
            const text : string = JSON.stringify(loadedConfig, undefined, 4);
            setJsonData(text);
            handleConfigurationUpdate(loadedConfig);
            setParserError("");
        }catch(ex){
            setJsonData(jsonData);

            setParserError((ex as Error).message);
        }

    };

    const [jsonData, setJsonData] = React.useState<string>("");
    const [parserError, setParserError] = React.useState<string>("");

    const handleStep = (index: number) => {
        showView(views[index]);
    }

    // State for the menu
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

    /*
    
        SYNTAX ONLY HIGHLIGHTED - YOU CANT EDIT IT 

        BACKWARDS AND FORWARDS BUTTON TO ADD

     */
    return (
        <div className="configuration-import-view">
            <div className={classes.grow}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {ResolveViewLabel(AvailableViews.ConfigurationImportView)}
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
            </div>
            <DecisionDialog
                handleAccept={resetConfiguration}
                handleCancel={() => {setIsConfigurationResetDialogOpen(false);}}
                isOpen={isConfigurationResetDialogOpen}
                title={"Reset configuration"}
                text={"Confirm the reset of the current configuration. All unsaved data will be deleted!"}
            />
            <div className={classes.appBarSpacer}></div>
            <div className="configuration-import-stepper-container">

               
                <IconButton onClick={() => { showView(AvailableViews.ConfigurationImportView); }}>
                    <ArrowBackOutlinedIcon />
                </IconButton>

                <Stepper className={classes.grow} nonLinear activeStep={views.findIndex(v => v === AvailableViews.ConfigurationImportView)}>
                    {views.map((view, index) => (
                        <Step key={ResolveViewLabel(view)}>
                            <StepButton onClick={() => {handleStep(index);}}>
                                {ResolveViewLabel(view)}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>

                <IconButton onClick={() => { showView(AvailableViews.ConfigurationExportView); }}>
                    <ArrowForwardOutlinedIcon />
                </IconButton>

            </div>
            <div className="configuration-import-view-import-container ">
                    <ConfigurationFileInput
                        handleChange={handleFileChange}
                        value={""}
                    />
                <div className="configuration-import-view-syntaxhighlighter-container">
                    {parserError !== ""?
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                <strong>Failure in the import:</strong>{parserError}
                            </Alert>
                            : ""
                        }
                    {jsonData.trim() !== ""?
                        <SyntaxHighlighter 
                            language='json' 
                            style={lightfair}
                            showLineNumbers={true}
                            wrapLongLines={true}
                        >
                            {jsonData}
                        </SyntaxHighlighter> 
                    :
                        ""
                    }
                </div>
            </div>
        </div>
    );
}