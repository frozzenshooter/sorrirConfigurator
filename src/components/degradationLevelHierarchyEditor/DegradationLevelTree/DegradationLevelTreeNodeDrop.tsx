/* eslint-disable react-hooks/exhaustive-deps*/
// this rule has to be excluded becuase of the usage of useEffect here
import { DEFAULT_DROP_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from "./TreeConstants";
import { useDrop } from 'react-dnd'
import ItemTypes from "../ItemTypes";
import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IDegradationLevel from "../../../models/IDegradationLevel";
import IConfiguration from "../../../models/IConfiguration";
import { useEffect, useState } from "react";
import { DegradationLevelTreeNodeDropPositionType } from "./DegradationLevelTreeNodeDropPositionType";
import HandleTreeDrop from "../../../util/HandleTreeDrop";
import { TreeType } from "../../../models/TreeType";

export interface IDegradationLevelTreeNodeDropProps {
    top: number;
    left: number;
    degradationLevelId: number;
    positionType: DegradationLevelTreeNodeDropPositionType;
    treeType: TreeType;
}

const DegradationLevelTreeNodeDrop = (props: IDegradationLevelTreeNodeDropProps) => {

    const {top, left, degradationLevelId, positionType, treeType} = props;

    const {configuration, updateConfiguration} = useConfigurationContext();

    // required to be able to update the callback for the drop behavior using useEffect
    const [item, setItem] = useState<IDegradationLevel | null>(null);

    const handleDrop = (item: IDegradationLevel) => {
           
        // check if an update is required (trivial case - you would insert it on the same spot again -this happens if the ids of the item and the current node are equal)
        if(item.id !== degradationLevelId){

            let newConfiguration : IConfiguration = Object.assign({}, configuration);

            newConfiguration = HandleTreeDrop(newConfiguration, positionType, item, degradationLevelId, treeType);

            updateConfiguration(newConfiguration);
        }
        
        // required to set it null in the case that you wwant to drop the same element twice on the same drop zone (if no new value is set the handle drop isn't called)
        setItem(null);
    };

    // required to be able to update the configuration by dropping an item - this will create a warning in the build process
    // to mitigate this a complete other way of creating the tree is probably required
    useEffect(() => {
        if(item != null){
            handleDrop(item);
        }
    }, [item]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.LEVEL,
        drop: (i) => setItem(i as IDegradationLevel), // 'as' works because we only allow to drop items with the ItemType LEVEL
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
    }));

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