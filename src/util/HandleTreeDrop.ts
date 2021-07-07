import { DegradationLevelTreeNodeDropPositionType } from "../components/degradationLevelHierarchyEditor/DegradationLevelTree/DegradationLevelTreeNodeDropPositionType";
import IConfiguration from "../models/IConfiguration";
import IDegradationLevel from "../models/IDegradationLevel";
import { TreeType } from "../models/TreeType";

const HandleTreeDrop = (newConfiguration: IConfiguration, positionType: DegradationLevelTreeNodeDropPositionType, item: IDegradationLevel, degradationLevelId: number, treeType: TreeType) : IConfiguration => {

    if(treeType === TreeType.Degradation){
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
                    stateChanges: [] // always remove all states, because we have to update in the next wizard step anyway
                });
            }
        }
        //#endregion

        //#region Handle the insertion of the current item in the tree

        if(positionType === DegradationLevelTreeNodeDropPositionType.ABOVE){

            const index = newConfiguration.degradations.findIndex(d => d.startDegradationLevelId === degradationLevelId);
            if(index !== -1){
                // Should always find a degradation, but just to be sure

                const currentLevelChange = newConfiguration.degradations[index];
                
                newConfiguration.degradations = newConfiguration.degradations.filter(d => d.startDegradationLevelId !== degradationLevelId).slice();

                // replacement of the currentLevelChange
                newConfiguration.degradations.push({
                    resultDegradationLevelId: item.id,
                    startDegradationLevelId: currentLevelChange.startDegradationLevelId,  
                    stateChanges: [] // always remove all states, because we have to update in the next wizard step anyway
                });

                // additional LevelChange outgoing from this Level to the previous child level
                newConfiguration.degradations.push({
                    resultDegradationLevelId: currentLevelChange.resultDegradationLevelId,
                    startDegradationLevelId: item.id,
                    stateChanges: [] // always remove all states, because we have to update in the next wizard step anyway
                });

            }
        }else{            
            // BELOW CASE


            // it is possible to simply add a new level change (old ones are already removed and there should no effects on other level changes)
            newConfiguration.degradations.push({
                resultDegradationLevelId: degradationLevelId,
                startDegradationLevelId: item.id,
                stateChanges: [] // always remove all states, because we have to update in the next wizard step anyway
            });
        }

        //#endregion

    }else{

        //#region Handle the removal of the current item from another position in the tree
        
        // Can only be one or none because only one parent is possible
        const resultLevelChangeIndex = newConfiguration.upgrades.findIndex(d => d.resultDegradationLevelId === item.id);

        if(resultLevelChangeIndex !== -1){
            // only if the node is the result of a parent node it is required to update possible child nodes

            const startLevelChangeId = newConfiguration.upgrades[resultLevelChangeIndex].startDegradationLevelId;

            // Get all the levels that are a result of the current level to be able to create new levelchanges that will start from the current parent node and end in the current child nodes
            const currentResultLevelChanges = newConfiguration.upgrades.filter(d => d.startDegradationLevelId === item.id);

            // Remove all current level changes
            newConfiguration.upgrades = newConfiguration.upgrades.filter(d => d.startDegradationLevelId !== item.id && d.resultDegradationLevelId !== item.id);

            for(const lvlChg of currentResultLevelChanges){
                newConfiguration.upgrades.push({
                    resultDegradationLevelId: lvlChg.resultDegradationLevelId,
                    startDegradationLevelId: startLevelChangeId,
                    stateChanges: [] // always remove all states, because we have to update in the next wizard step anyway
                });
            }
        }
        //#endregion

        //#region Handle the insertion of the current item in the tree

        if(positionType === DegradationLevelTreeNodeDropPositionType.ABOVE){

            const index = newConfiguration.upgrades.findIndex(d => d.resultDegradationLevelId === degradationLevelId);
            if(index !== -1){
                // Should always find a upgrade, but just to be sure

                const currentLevelChange = newConfiguration.upgrades[index];
                
                newConfiguration.upgrades = newConfiguration.upgrades.filter(d => d.resultDegradationLevelId !== degradationLevelId).slice();

                // replacement of the currentLevelChange
                newConfiguration.upgrades.push({
                    resultDegradationLevelId: item.id,
                    startDegradationLevelId: currentLevelChange.startDegradationLevelId,  
                    stateChanges: [] // always remove all states, because we have to update in the next wizard step anyway
                });

                // additional LevelChange outgoing from this Level to the previous child level
                newConfiguration.upgrades.push({
                    resultDegradationLevelId: degradationLevelId,
                    startDegradationLevelId: item.id,
                    stateChanges: [] // always remove all states, because we have to update in the next wizard step anyway
                });

            }

        }else{            
            // BELOW CASE


            // it is possible to simply add a new level change (old ones are already removed and there should no effects on other level changes)
            newConfiguration.upgrades.push({
                resultDegradationLevelId: item.id,
                startDegradationLevelId: degradationLevelId,
                stateChanges: [] // always remove all states, because we have to update in the next wizard step anyway
            });
        }

        //#endregion

    }


    return newConfiguration;
};

export default HandleTreeDrop;