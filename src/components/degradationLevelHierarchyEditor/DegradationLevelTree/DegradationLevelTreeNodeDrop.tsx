import { DEFAULT_DROP_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from "./TreeConstants";
import { useDrop } from 'react-dnd'
import ItemTypes from "../ItemTypes";
import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IDegradationLevel from "../../../models/IDegradationLevel";
import IDegradationLevelState from "../../../models/IDegradationLevelState";
import IConfiguration from "../../../models/IConfiguration";
import { useCallback } from "react";
import { useEffect } from "react";

export enum DegradationLevelTreeNodeDropType {
    ABOVE = 0,
    BELOW = 1
}

export interface IDegradationLevelTreeNodeDropProps {
    top: number;
    left: number;
    degradationLevelId: number | null;
    type: DegradationLevelTreeNodeDropType;
}

const DegradationLevelTreeNodeDrop = (props: IDegradationLevelTreeNodeDropProps) => {

    const {top, left, degradationLevelId, type} = props;

    const {configuration, updateConfiguration} = useConfigurationContext();

    const handleDrop = (item: IDegradationLevel) => {
   
        console.log(configuration);

        //console.log(degradationLevelId + "("+asString(type)+"):", item);
        
        const newConfiguration : IConfiguration = JSON.parse(JSON.stringify(configuration));
    
        newConfiguration.degradations.push({
            resultDegradationLevelId: degradationLevelId,
            startDegradationLevelId: item.id,
            stateResultLevel: null,
            stateStartLevel: null,
        });
    
        newConfiguration.degradationLevels = configuration.degradationLevels.slice();
    
        //console.log(configuration, newConfiguration);
    
        updateConfiguration(newConfiguration);
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.LEVEL,
        drop: (item) => handleDrop(item as IDegradationLevel), // as works because we only allow to drop items with the ItemType LEVEL
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
    }))

    return (
        <div
            ref={drop}            
            style={{
                top: top + "px",
                left: left + "px",
                position: "absolute",
                width: DEFAULT_NODE_WIDTH - 16,
                border: isOver ? "1px dashed black" : "none",
                height: DEFAULT_DROP_NODE_HEIGHT+ "px" , 
                boxSizing: "border-box",
                backgroundColor: isOver ? "rgba(63, 81, 181, 0.3)" : "transparent",
                zIndex: 9 // required because otherwise the arrows would be in front of it             
            }}
        >
            
        </div>
    );
};

export default DegradationLevelTreeNodeDrop;