import React from 'react';
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import IDegradationLevel from '../../../models/IDegradationLevel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Divider } from '@material-ui/core';
import './DegradationLevelDialog.css';
import { useConfigurationContext } from '../../../context/ConfigurationContext';
import IConfiguration from '../../../models/IConfiguration';
import DegradationLevelDependencySelector from '../DegradationLevelDependencySelector/DegradationLevelDependencySelector';
import IDegradationLevelDependency from '../../../models/IDegradationLevelDependency';
import DecisionDialog from '../../decisionDialog/DecisionDialog';
import DegradationLevelDialogType from './DegradationLevelDialogType';
import Alert from '@material-ui/lab/Alert';

export interface IDegradationLevelDialogProps {
    open: boolean
    type: DegradationLevelDialogType,
    degradationLevel?: IDegradationLevel,
    onClose: () => void;
}

/**
 * Styles for the @DegradationLevelDialog
 */
 const useStyles = makeStyles((theme: Theme) =>
 createStyles({
       title: {            
           flexGrow: 1,
       },
       appBarSpacer: theme.mixins.toolbar,
       formControl: {
        marginRight: theme.spacing(1),
        minWidth: 200,
        maxWidth: 200,
    },
   })
);


/**
 * Transition of the dialog to slide in from the topside 
 */
 const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  }
);

const DegradationLevelDialog = (props: IDegradationLevelDialogProps) => {

    const {open, type, degradationLevel, onClose} = props;

    //#region Init state
    const initalDegradationLevel :IDegradationLevel = {
        id: 0,
        label: "",
        dependencies: []
    };

    if(type === DegradationLevelDialogType.Edit && degradationLevel !== null && degradationLevel !== undefined){
        initalDegradationLevel.id = degradationLevel.id;
        initalDegradationLevel.label = degradationLevel.label;
        initalDegradationLevel.dependencies = degradationLevel.dependencies.slice();
    }

    //#endregion

    const [id, setId] = React.useState<number>(initalDegradationLevel.id);
    const [label, setLabel] = React.useState<string>(initalDegradationLevel.label);
    const [dependencies, setDependencies] = React.useState<IDegradationLevelDependency[]>(initalDegradationLevel.dependencies);
    const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState<boolean>(false);
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);

    const classes = useStyles();

    const {configuration, updateConfiguration} = useConfigurationContext();


    //#region Close/Save handling
    const resetState = () => {
        if(type === DegradationLevelDialogType.Create){
            setId(0);
            setLabel("");
            setDependencies([]);
            setErrorMessages([]);
        }
        // This is not required for type === Edit, because then the dialog has to be rerendered anyway
    }

    const handleClose = () => {
        resetState();
        onClose();
    }

    const handleSave = () => {
        if(isValid()){
            const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));

            // Remove all dont cares and only save the relevant ones
            const newDependencies = dependencies.filter(d => d.shadowmodeId !== "").slice();
    
            if(type === DegradationLevelDialogType.Create) {

                // you can just push it - validate ensures there can't be an invalid state
                const newDegradationLevel: IDegradationLevel = {
                    id: id,
                    label: label,
                    dependencies: newDependencies
                };
        
                newConfiguration.degradationLevels.push(newDegradationLevel);

            }else if(type === DegradationLevelDialogType.Edit) {

                if(id !== initalDegradationLevel.id){
                    // id has changed - remove old level and insert new one
                    newConfiguration.degradationLevels = newConfiguration.degradationLevels.filter(d => d.id !== initalDegradationLevel.id).slice();
                    const newDegradationLevel: IDegradationLevel = {
                        id: id,
                        label: label,
                        dependencies: newDependencies
                    };
            
                    newConfiguration.degradationLevels.push(newDegradationLevel);
                }else{
                    // id the same - update
                    const index = newConfiguration.degradationLevels.findIndex(d => d.id === id);
                    newConfiguration.degradationLevels[index].label = label;
                    newConfiguration.degradationLevels[index].dependencies = dependencies.slice();
                }
            }

            resetState();
            updateConfiguration(newConfiguration);
            onClose();
        }
    };

    //#endregion

    //#region Validation
    const isValid = (): boolean => {
        let isValid = true;
        const newErrorMessages :string[] = [];

        if(type === DegradationLevelDialogType.Create){
            // Validate if id already exists?

            const index = configuration.degradationLevels.findIndex(d => d.id === id);
            if(index !== -1){
                isValid = false;
                newErrorMessages.push("The id '"+id+"' is already used by another Degradation Level");
            }
        }

        if(type === DegradationLevelDialogType.Edit){
            // If id has changed it can happen that the id is already used by another DegradationLevel
            if(id !== initalDegradationLevel.id){
                const index = configuration.degradationLevels.findIndex(d => d.id === id);
                if(index !== -1){
                    isValid = false;
                    newErrorMessages.push("The id '"+id+"' is already used by another Degradation Level");
                }
            }
        }

        setErrorMessages(newErrorMessages);

        return isValid
    };

    //#endregion

    //#region change handlers

    const handleDegradationLevelDependencySelectorChange = (degradationLevelDependency: IDegradationLevelDependency) => {

        const newDependencies = dependencies.slice();

        const index = newDependencies.findIndex(d => d.subcomponentId === degradationLevelDependency.subcomponentId);

        if(index ===-1){
            newDependencies.push(degradationLevelDependency);
        }else{
            newDependencies[index].shadowmodeId = degradationLevelDependency.shadowmodeId;
        }

        setDependencies(newDependencies);
    };

    const getShadowmodeIdFromExistingDependency = (subcomponentId: string) => {

        const index = dependencies.findIndex(d => d.subcomponentId === subcomponentId);

        if(index !== -1){
            return dependencies[index].shadowmodeId;
        }

        //This means the subcomponent is "DC" - don't care
        return "";
    };

    //#endregion

    //#region Cancel confirmation dialog

    const handleCancel = () => {
        setOpenConfirmationDialog(true);
    }

    const handleCancelConfirmationDialogAccept = () => {
        setOpenConfirmationDialog(false);
        handleClose();
    };

    const handleCancelConfirmationDialogCancel = () => {
        setOpenConfirmationDialog(false);
    };
    
    //#endregion

    //#region Title generation
    const getTitle = () => {
        let title = "";

        if(type === DegradationLevelDialogType.Create){
            title = "Create";
        }else{
            title = "Edit";

            if(label !== ""){
                title = title + " - " + label;
            }
        }

        return title;
    }

    //#endregion
    
    return (
        <Dialog
            fullScreen={true}
            open={open}
            onClose={handleCancel}
            TransitionComponent={Transition}
            >
                <AppBar position="fixed">
                    <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCancel}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {getTitle()}
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleSave}>
                        <SaveIcon />
                    </IconButton>

                    </Toolbar>
                </AppBar>
                <div className={classes.appBarSpacer}></div>
                {errorMessages.length > 0?
                    <div id="degradation-level-dialog-error-container">
                        {errorMessages.map(e => {
                                return (
                                    <div className="degradation-level-dialog-error-container-item">
                                        <Alert severity="error">
                                            {e}
                                        </Alert>                                    
                                    </div>
                                );
                            }
                        )}
                    </div>
                    : 
                    null
                }
                <div id="degradation-level-dialog-properties-container">
                    <h3 className="degradation-level-dialog-properties-section-caption">Details</h3>
                    <FormControl className={classes.formControl}>
                        <TextField
                            label="Id"
                            type="number"
                            variant="outlined"
                            value={id}
                            onChange={(ev) => {setId(+(ev.target.value));}}
                            InputLabelProps={{ shrink: true }}
                            /> 
                    </FormControl> 
                    <FormControl className={classes.formControl}>
                        <TextField
                            value={label}
                            onChange={(ev) => {setLabel(ev.target.value);}}
                            variant="outlined"
                            label="Label"/> 
                    </FormControl> 
                </div>
                <Divider className="degradation-level-dialog-properties-divider"/>
                {configuration.subcomponents.length > 0?
                    <React.Fragment>
                        <div id="degradation-level-dialog-dependency-container">
                            <h3 className="degradation-level-dialog-properties-section-caption">Shadowmode dependencies</h3>
                            <div id="degradation-level-dialog-dependency-container-item">
                                
                                {configuration.subcomponents.map(subc => {
                                    return (
                                        <DegradationLevelDependencySelector
                                            key={subc.id} 
                                            subcomponent={subc}
                                            onChange={handleDegradationLevelDependencySelectorChange}
                                            shadowmodeId={getShadowmodeIdFromExistingDependency(subc.id)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <Divider className="degradation-level-dialog-properties-divider"/>
                    </React.Fragment>
                    : null
                }
                <DecisionDialog
                    open={openConfirmationDialog}
                    title={"Discard changes?"}
                    text={"All changes will be discarded!"}
                    onCancelClick={handleCancelConfirmationDialogCancel}
                    onConfirmClick={handleCancelConfirmationDialogAccept}
                />
        </Dialog>
    );
}

export default DegradationLevelDialog;