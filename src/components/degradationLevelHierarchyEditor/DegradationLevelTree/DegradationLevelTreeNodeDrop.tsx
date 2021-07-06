/* eslint-disable react-hooks/exhaustive-deps*/
// this rule has to be excluded becuase of the usage of useEffect here
import { DEFAULT_DROP_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from "./TreeConstants";
import { useDrop } from 'react-dnd'
import ItemTypes from "../ItemTypes";
import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IDegradationLevel from "../../../models/IDegradationLevel";
import IConfiguration from "../../../models/IConfiguration";
import { useEffect, useState } from "react";

export enum DegradationLevelTreeNodeDropType {
    ABOVE = 0,
    BELOW = 1
}

export interface IDegradationLevelTreeNodeDropProps {
    top: number;
    left: number;
    degradationLevelId: number;
    type: DegradationLevelTreeNodeDropType;
}

const DegradationLevelTreeNodeDrop = (props: IDegradationLevelTreeNodeDropProps) => {

    const {top, left, degradationLevelId, type} = props;

    const {configuration, updateConfiguration} = useConfigurationContext();

    // required to be able to update the callback for the drop behavior using useEffect
    const [item, setItem] = useState<IDegradationLevel>();

    const handleDrop = (item: IDegradationLevel) => {
           
        // check if an update is required (trivial case - you would insert it on the same spot again - ids are the same)
        
        if(item.id !== degradationLevelId){

            const newConfiguration : IConfiguration = Object.assign({}, configuration);
        
            //#region Handle the removal of the current item from another position in the tree
            
            // Can only be one or none because only one parent is possible
            const startLevelChangeIndex = newConfiguration.degradations.findIndex(d => d.startDegradationLevelId === item.id);

            if(startLevelChangeIndex !== -1){
                // only if there is a parent it is required to update possible child nodes

                const startLevelChange = newConfiguration.degradations[startLevelChangeIndex];

                // Get all the levels that result in the current level to be able to create new levelchanges that will start from them but end in the current parent level
                const currentResultLevelChanges = newConfiguration.degradations.filter(d => d.resultDegradationLevelId === item.id);

                // Remove all current level changes
                newConfiguration.degradations = newConfiguration.degradations.filter(d => d.startDegradationLevelId !== item.id && d.resultDegradationLevelId !== item.id);
        
                for(const lvlChg of currentResultLevelChanges){
                    newConfiguration.degradations.push({
                        resultDegradationLevelId: startLevelChange.resultDegradationLevelId,
                        startDegradationLevelId: lvlChg.startDegradationLevelId,
                        stateChanges: []
                    });
                }
            }
            //#endregion

            //#region Handle the insertion of the current item in the tree

            if(type === DegradationLevelTreeNodeDropType.ABOVE){

                const index = newConfiguration.degradations.findIndex(d => d.startDegradationLevelId === degradationLevelId);
                if(index !== -1){
                    // Should always find a degradation, but just to be sure

                    const currentLevelChange = newConfiguration.degradations[index];
                    
                    newConfiguration.degradations = newConfiguration.degradations.filter(d => d.startDegradationLevelId !== degradationLevelId).slice();

                    // replacement of the currentLevelChange
                    newConfiguration.degradations.push({
                        resultDegradationLevelId: item.id,
                        startDegradationLevelId: currentLevelChange.startDegradationLevelId,  
                        stateChanges: []
                    });

                    // additional LevelChange outgoing from this Level to the previous child level
                    newConfiguration.degradations.push({
                        resultDegradationLevelId: currentLevelChange.resultDegradationLevelId,
                        startDegradationLevelId: item.id,
                        stateChanges: []
                    });

                }
            }else{            
                // BELOW CASE


                // it is possible to simply add a new level change (old ones are already removed and there should no effects on other level changes)
                newConfiguration.degradations.push({
                    resultDegradationLevelId: degradationLevelId,
                    startDegradationLevelId: item.id,
                    stateChanges: []
                });
            }

            //#endregion

            updateConfiguration(newConfiguration);
        }
    };

    // required to be able to update the configuration by dropping an item - this will create a warning in the build process
    // to mitigate this a complete other way of creating the tree is probably required
    useEffect(() => {
        if(item){
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