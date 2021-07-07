import IConfiguration from "../models/IConfiguration";
import IDegradationLevel from "../models/IDegradationLevel";

export enum LevelChangeDeletionType {
    Degradation = 0,
    Upgrade = 1
}

/**
 * This functions is a helper function to delete LevelChanges that are related with the @param levelToDelete  from the @param newConfiguration
 * 
 * It will also add additional LevelChanges to enforce a correct tree
 * 
 * @param newConfiguration 
 * @param type 
 * @param levelToDelete 
 * @returns 
 */
const LevelChangeDeletion = (newConfiguration: IConfiguration, type: LevelChangeDeletionType, levelToDelete: IDegradationLevel) : IConfiguration => {

    if(type === LevelChangeDeletionType.Degradation){
        // if the deletion happens in the degradation tree only delete and update the degredations
        
        const indexDegradationLevelChange = newConfiguration.degradations.findIndex(d => d.startDegradationLevelId === levelToDelete.id);

        if(indexDegradationLevelChange !== -1){

            // the node is used in the tree for the degradations and therefore we have to update level changes
            const parentNodeId : number = newConfiguration.degradations[indexDegradationLevelChange].resultDegradationLevelId;

            // Find all LevelChanges that point to the current degradation level - required to be able to create new LevelChanges that point directly from the child to the parent of this level
            const childNodeLevelChanges = newConfiguration.degradations.filter(d => d.resultDegradationLevelId === levelToDelete.id).slice();

            newConfiguration.degradations = newConfiguration.degradations.filter(d => d.resultDegradationLevelId !== levelToDelete.id && d.startDegradationLevelId !== levelToDelete.id).slice();

            // add the new Level Changes
            for(const childNode of childNodeLevelChanges){

                newConfiguration.degradations.push({
                    resultDegradationLevelId: parentNodeId,
                    startDegradationLevelId: childNode.startDegradationLevelId,
                    stateChanges: []
                });
            }
        }
    }else{
        // the deletion happend in the upgrade tree and therefore only the upgrades have to be updated and deleted

        const indexUpgradeLevelChange = newConfiguration.upgrades.findIndex(d => d.resultDegradationLevelId === levelToDelete.id);

        if(indexUpgradeLevelChange !== -1){

            // the node is used in the tree for the upgrades and therefore we have to update level changes
            const parentNodeId : number = newConfiguration.upgrades[indexUpgradeLevelChange].startDegradationLevelId;

            // Find all LevelChanges that are the result of the current degradation level - required to be able to create new LevelChanges that point directly from the parent to the children of this level
            const childNodeLevelChanges = newConfiguration.upgrades.filter(d => d.startDegradationLevelId === levelToDelete.id).slice();

            newConfiguration.degradations = newConfiguration.upgrades.filter(d => d.resultDegradationLevelId !== levelToDelete.id && d.startDegradationLevelId !== levelToDelete.id).slice();

            // add the new Level Changes
            for(const childNode of childNodeLevelChanges){

                newConfiguration.degradations.push({
                    resultDegradationLevelId: childNode.resultDegradationLevelId,
                    startDegradationLevelId: parentNodeId,
                    stateChanges: []
                });
            }
        }
    }

    return newConfiguration;
};

export default LevelChangeDeletion;