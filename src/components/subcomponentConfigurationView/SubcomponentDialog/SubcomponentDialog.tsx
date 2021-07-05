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

            const index = newConfiguration.subcomponents.findIndex(s => s.id === id);
            if(index === -1){
                //Delete the subcomponent with previous id and add a new one with the updated data
                newConfiguration.subcomponents = newConfiguration.subcomponents.filter(s => s.id !== subcomponent.id).slice();
                const newSubcomponent : ISubcomponent = {
                    id: id,
                    name: name,
                    shadowmodes: shadowmodes
                };
                newConfiguration.subcomponents.push(newSubcomponent);

            }else{
                // just update
                newConfiguration.subcomponents[index].name = name;
                newConfiguration.subcomponents[index].shadowmodes = shadowmodes;
            }

            // There might be degradation levels with a dependency on this subcomponent which have to be updated
            // TODO: !!!!!!!!!!!!!!!!!!!

        }else{

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
                                        <div className="subcomponent-dialog-content-container-error">
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