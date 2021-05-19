import { Dialog, DialogProps } from "@material-ui/core";
import { ContactSupportOutlined } from "@material-ui/icons";
import React from "react";
import ISubcomponent from "../../../models/ISubcomponent";
import SubcomponentDialogType from "./SubcomonentDialogType";

export interface SubcomponentDialogProps {
    type: SubcomponentDialogType;
    open: boolean;
    subcomponent?: ISubcomponent;
    onCancel: () => void;
    onSave: (subComponent: ISubcomponent)=> void;
}

const SubcomponentDialog = (props: SubcomponentDialogProps) => {
    const {type, open, onCancel, onSave} = props;
    let initSubcomponent = props.subcomponent;

    //#region Subcomponent init

    // make sure you start with an empty 
    if(initSubcomponent === undefined || initSubcomponent === null){
        initSubcomponent = {
            id:"",
            name:"",
            shadowmodes: []
        };
    }

    //#endregion

    const [subcomponent, setSubcomponent] = React.useState<ISubcomponent>(initSubcomponent);



    return (
        <Dialog
            open={open}
            onClose={onCancel} 
            fullWidth={true}
            maxWidth={'md' as DialogProps['maxWidth']}
        >
            
        </Dialog>
    );
};

export default SubcomponentDialog;