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
import ShadowmodeChipInput from "../ShadowmodeChipInput/ShadowmodeChipInput";
import IShadowmode from "../../../models/IShadowmode";
import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IConfiguration from "../../../models/IConfiguration";

export interface ISubcomponentDialogProps {
    type: SubcomponentDialogType;
    open: boolean;
    subcomponent: ISubcomponent;
    onClose: () => void;
}

const SubcomponentDialog = (props: ISubcomponentDialogProps) => {
    const {subcomponent, type, open, onClose} = props;
  
    const {configuration, updateConfiguration} = useConfigurationContext();

    //#region Subcomponent init

    let initSubcomponent : ISubcomponent = {
        id:"",
        name:"",
        shadowmodes:[]        
    };


    // make sure you start with an empty 
   /* if(subcomponentId !== undefined && subcomponentId !== null && subcomponentId !== ""){
        const index = configuration.subcomponents.findIndex(s => s.id === subcomponentId);

        if(index !== -1){            
            initSubcomponent= JSON.parse(JSON.stringify(configuration.subcomponents[index]));

        }
        console.log("index", index, initSubcomponent);
    }*/

    //#endregion

    const [id, setId] = React.useState<string>(subcomponent.id);
    const [name, setName] = React.useState<string>(subcomponent.name);
    const [shadowmodes, setShadowmodes] = React.useState<IShadowmode[]>(subcomponent.shadowmodes);

    //#region Change handler
    const handleSave = () => {
        const newConfiguration : IConfiguration = JSON.parse(JSON.stringify(configuration));
        const index = newConfiguration.subcomponents.findIndex(s => s.id === id);

        if(type === SubcomponentDialogType.Edit){

            if(index === -1){
                //Delete the subcomponent with previous id and add a new one with the updated data
                newConfiguration.subcomponents = newConfiguration.subcomponents.filter(s => s.id !== id).slice();
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

        }else{
            if(index !== -1){
                // A subcomponent with this id exists already
                // TODO: show error
            }else{
                const newSubcomponent : ISubcomponent = {
                    id: id,
                    name: name,
                    shadowmodes: shadowmodes
                };
                newConfiguration.subcomponents.push(newSubcomponent);
            }
        }

        updateConfiguration(newConfiguration);
        onClose();
    };

    const handleIdChange = (ev : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setId(ev.target.value);
    }

    const handleNameChange = (ev : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(ev.target.value);
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
                        <TextField 
                            variant="outlined"
                            id="id"
                            label="ID" 
                            value={id}
                            onChange={handleIdChange}
                            className="subcomponent-dialog-content-container-item"
                            style={{paddingBottom: "16px"}}/>
                        <TextField 
                            variant="outlined"
                            id="name"
                            label="Name"
                            value={name}
                            onChange={handleNameChange}
                            className="subcomponent-dialog-content-container-item"
                            style={{paddingBottom: "16px"}}/>
                        <ShadowmodeChipInput
                            shadowmodes={shadowmodes.slice()}
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