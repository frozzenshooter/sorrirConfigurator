/* eslint-disable react-hooks/exhaustive-deps*/
// this rule has to be excluded becuase of the usage of useEffect here
import { useDrop } from 'react-dnd'
import ItemTypes from "../ItemTypes";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useState, useEffect } from "react";
import IDegradationLevel from "../../../models/IDegradationLevel";
import IConfiguration from "../../../models/IConfiguration";
import { useConfigurationContext } from "../../../context/ConfigurationContext";
import LevelChangeDeletion, { LevelChangeDeletionType } from '../../../util/LevelChangeDeletion';

export enum  DeleteDropNodeType {
    Degradation = 0,
    Upgrade = 1
}

export interface DeleteDropNodeProps {
    type:  DeleteDropNodeType;
    width: number;
    height: number
}

const DeleteDropNode = (props: DeleteDropNodeProps) => {
    const {type, width, height} = props;

    const {configuration, updateConfiguration} = useConfigurationContext();

    // required to be able to update the callback for the drop behavior using useEffect
    const [item, setItem] = useState<IDegradationLevel | null>(null);

    const handleDrop = (item: IDegradationLevel) =>{

        let newConfiguration : IConfiguration = Object.assign({}, configuration);

        const levelChangeDeletionType = type === DeleteDropNodeType.Degradation ? LevelChangeDeletionType.Degradation : LevelChangeDeletionType.Upgrade;

        // Delete either the degradations or the upgrades (depending on the tree)
        newConfiguration = LevelChangeDeletion(newConfiguration, levelChangeDeletionType, item);

        updateConfiguration(newConfiguration);

        setItem(null);
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.LEVEL,
        drop: (i) => setItem(i as IDegradationLevel),
        collect: monitor => ({
          isOver: !!monitor.isOver()
        }),
    }));

    // required to be able to update the configuration by dropping an item - this will create a warning in the build process
    // to mitigate this a complete other way of creating the tree is probably required
    useEffect(() => {
        if(item != null){
            handleDrop(item);
        }
    }, [item]);

    return (
        <div    
            ref={drop}       
            style={{
                margin: "8px",
                top: 0 + "px",
                left: 0 + "px",
                position: "absolute",
                width: width - 16,
                border: "1px dashed black",
                height: (height-8) + "px" , 
                boxSizing: "border-box",
                backgroundColor: isOver ? "rgb(233, 30, 99, 0.3)" : "transparent",
                zIndex: 9 // required because otherwise the arrows would be in front of it             
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection:"row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%"                   
                }}
            >
                <DeleteOutlineIcon/>
            </div>
        </div>
    );
}

export default DeleteDropNode;