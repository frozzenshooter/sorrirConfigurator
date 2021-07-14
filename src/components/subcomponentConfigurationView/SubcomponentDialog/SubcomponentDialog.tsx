import { Dialog, DialogProps } from "@material-ui/core";
import React from "react";
import ISubcomponent from "../../../models/ISubcomponent";
import SubcomponentDialogType from "./SubcomonentDialogType";
import SubcomponentDialogActions from "./SubcomponentDialogActions";
import SubcomponentDialogContent from "./SubcomponentDialogContent";
import SubcomponentDialogTitle from "./SubcomponentDialogTitle";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './SubcomponentDialog.css';
import IShadowmode from "../../../models/IShadowmode";
import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IConfiguration from "../../../models/IConfiguration";
import Alert from '@material-ui/lab/Alert';
import ChipInput from "../../chipInput/ChipInput";

export interface ISubcomponentDialogProps {
    type: SubcomponentDialogType;
    open: boolean;
    subcomponent: ISubcomponent;
    onClose: (newComponent?: ISubcomponent) => void;
}

const SubcomponentDialog = (props: ISubcomponentDialogProps) => {
    const {subcomponent, type, open, onClose} = props;
  
    const {configuration, updateConfiguration} = useConfigurationContext();

    const [id, setId] = React.useState<string>(subcomponent.id);
    const [name, setName] = React.useState<string>(subcomponent.name);
    const [shadowmodes, setShadowmodes] = React.useState<IShadowmode[]>(subcomponent.shadowmodes);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [updateId, setUpdateId] = React.useState<boolean>(subcomponent.id === "");

    const isValidSubcomponent = (): boolean => {
        let isValid = true;
        let errorMessages = [];

        if(id === "" || id === null || id === undefined){
            errorMessages.push("Id can't be empty!");
            isValid = false;
        }

        if(name === "" || name === null || name === undefined){
            errorMessages.push("Name can't be empty!");
            isValid = false;
        }

        if(type === SubcomponentDialogType.Create){
            const index = configuration.subcomponents.findIndex(s => s.id === id);
            if(index !== -1){
                errorMessages.push("Id already exists!");
                isValid = false;
            }
        }

        if(type === SubcomponentDialogType.Edit && subcomponent.id !== id){
            const index = configuration.subcomponents.findIndex(s => s.id === id);
            if(index !== -1){
                errorMessages.push("Not possible to change the Id to '"+id+"' - Id already exists!");
                isValid = false;
            }
        }

        if(shadowmodes.length === 0){
            errorMessages.push("No shadowmode specified!");
            isValid = false;
        }

        setErrors(errorMessages);

        return isValid;
    }

    //#region Change handler
    const handleSave = () => {

        if(!isValidSubcomponent()){
            return;
        }

        const newConfiguration : IConfiguration = Object.assign({}, configuration);

        if(type === SubcomponentDialogType.Edit){

            //Check if id was changed and get index in one step
            const index = newConfiguration.subcomponents.findIndex(s => s.id === id);
            if(index === -1){

                // Get previous subcomponent to be able to delete the dependencies on the shadowmodes
                const prevIndex = newConfiguration.subcomponents.findIndex(s => s.id === subcomponent.id);

                // Generate a list of the ids of all the deleted shadowmodes to remove the dependencies on them
                const idsOfshadowModesToDelete: string[] = [];

                if(prevIndex !== -1){
                    newConfiguration.subcomponents[prevIndex].shadowmodes.forEach(s => {

                        const ind = shadowmodes.findIndex(sm => s.id === sm.id);
    
                        if(ind === -1){
                            // shadowmode not found in the new shadowmodes - remove from dependencies
                            idsOfshadowModesToDelete.push(s.id);
                        }
                    });
                }

                // It is required to update the dependencies of the degradationLevels because there might be some deleted shadowmodes and required to update the subcomponentId
                for(let degradationLevelsIndex=0; degradationLevelsIndex < newConfiguration.degradationLevels.length; degradationLevelsIndex++){

                    // Update the id with the new id in all dependencies
                    for(let dependencySetIndex = 0; dependencySetIndex < newConfiguration.degradationLevels[degradationLevelsIndex].dependencySets.length; dependencySetIndex++){
                        // Therefore it is required to iteratoe over each set and all the dependencies in there
                        for( let dependencyIndex = 0; dependencyIndex < newConfiguration.degradationLevels[degradationLevelsIndex].dependencySets[dependencySetIndex].dependencies.length; dependencyIndex++){
                            
                            if(newConfiguration.degradationLevels[degradationLevelsIndex].dependencySets[dependencySetIndex].dependencies[dependencyIndex].subcomponentId === subcomponent.id){
                                newConfiguration.degradationLevels[degradationLevelsIndex].dependencySets[dependencySetIndex].dependencies[dependencyIndex].subcomponentId = id;
                            }
                        }                        
                    
                        // delete all the dependencies that were dependend on a deleted shadowmodes
                        newConfiguration.degradationLevels[degradationLevelsIndex].dependencySets[dependencySetIndex].dependencies = newConfiguration.degradationLevels[degradationLevelsIndex].dependencySets[dependencySetIndex].dependencies.filter(d => {
                            if(d.subcomponentId !== id){
                                return true;
                            }else{
                                const smIndex = idsOfshadowModesToDelete.findIndex(idToDelete => idToDelete === d.shadowmodeId);
                                if(smIndex !== -1){
                                    // shadowmode is in the list of deleted shadowmodes - remove it
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }).slice();
                    }
                }

                //Delete the subcomponent with previous id and add a new one with the updated data
                newConfiguration.subcomponents = newConfiguration.subcomponents.filter(s => s.id !== subcomponent.id).slice();
                const newSubcomponent : ISubcomponent = {
                    id: id,
                    name: name,
                    shadowmodes: shadowmodes
                };
                newConfiguration.subcomponents.push(newSubcomponent);
                
            }else{
                // id stays the same - just update the other values
                newConfiguration.subcomponents[index].name = name;

                // Generate a list of the ids of all the deleted shadowmodes to remove the dependencies on them
                const idsOfshadowModesToDelete: string[] = [];

                newConfiguration.subcomponents[index].shadowmodes.forEach(s => {

                    const ind = shadowmodes.findIndex(sm => s.id === sm.id);

                    if(ind === -1){
                        // shadowmode not found in the new shadowmodes - remove from dependencies
                        idsOfshadowModesToDelete.push(s.id);
                    }
                });

                // Update the shadowmodes in the configuration
                newConfiguration.subcomponents[index].shadowmodes = shadowmodes;

                // It is required to update the dependencies of the degradationLevels because there might be some deleted shadowmodes
                for(let degradationLevelsIndex=0; degradationLevelsIndex < newConfiguration.degradationLevels.length; degradationLevelsIndex++){
                    for(let dependencySetIndex = 0; dependencySetIndex < newConfiguration.degradationLevels[degradationLevelsIndex].dependencySets.length; dependencySetIndex++){
                        
                        newConfiguration.degradationLevels[degradationLevelsIndex].dependencySets[dependencySetIndex].dependencies = newConfiguration.degradationLevels[degradationLevelsIndex].dependencySets[dependencySetIndex].dependencies.filter(d => {
                            if(d.subcomponentId !== id){
                                return true;
                            }else{
                                const smIndex = idsOfshadowModesToDelete.findIndex(idToDelete => idToDelete === d.shadowmodeId);
                                if(smIndex !== -1){
                                    // shadowmode is in the list of deleted shadowmodes - remove it
                                    return false;
                                }else{
                                    return true;
                                }
                            }
                        }).slice();
                    }                   
                }
            }

        }else{

            // creation of a new subcomponent - you can just add it because the validation already checked it
            const newSubcomponent : ISubcomponent = {
                id: id,
                name: name,
                shadowmodes: shadowmodes
            };
            newConfiguration.subcomponents.push(newSubcomponent);
        }

        updateConfiguration(newConfiguration);
        onClose();
    };

    const handleIdChange = (ev : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setId(ev.target.value);
        if(ev.target.value === ""){
            setUpdateId(true);
        }else{
            setUpdateId(false);
        }
    }

    const handleNameChange = (ev : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(ev.target.value);
        if(updateId === true){
            setId(ev.target.value);
        }
    }

    const handleShadowmodeChange = (shadowmodes: IShadowmode[]) => {
        setShadowmodes(shadowmodes);
    }

    //#endregion

    return (
        <Dialog
            open={open}
            onClose={() => {onClose();}} 
            fullWidth={true}
            maxWidth={'md' as DialogProps['maxWidth']}
        >
                <SubcomponentDialogTitle id="subcomponent-dialog-title" onClose={() => {onClose();}}>
                    {type === SubcomponentDialogType.Create ? "Create new subcomponent" : "Edit subcomponent"}
                </SubcomponentDialogTitle>
                <SubcomponentDialogContent dividers> 
                    <div id="subcomponent-dialog-content-container"> 
                        {errors.length > 0?
                            errors.map(e => {
                                    return (
                                        <div className="subcomponent-dialog-content-container-error" key={e}>
                                            <Alert severity="error">
                                                {e}
                                            </Alert>                                    
                                        </div>
                                    );
                                }
                            )
                            : 
                            null
                        }
                        <div id="subcomponent-dialog-content-properties-container">
                            <div id ="subcomponent-dialog-content-container-name">
                                <TextField 
                                    variant="outlined"
                                    id="name"
                                    label="Name"
                                    value={name}
                                    onChange={handleNameChange}/>
                            </div>
                            <TextField 
                                variant="outlined"
                                id="id"
                                label="ID" 
                                value={id}
                                onChange={handleIdChange}/>
         
                        </div>
                        <ChipInput
                            label={"Shadowmodes"}
                            chips={shadowmodes.slice()}
                            onChange={handleShadowmodeChange}
                        />
                    </div>
                </SubcomponentDialogContent>
                <SubcomponentDialogActions>
                    <Button autoFocus onClick={handleSave} color="primary">
                        Save
                    </Button>
                    <Button onClick={() => {onClose();}} color="secondary">
                        Cancel
                    </Button>
                </SubcomponentDialogActions>
            
        </Dialog>
    );
};

export default SubcomponentDialog;