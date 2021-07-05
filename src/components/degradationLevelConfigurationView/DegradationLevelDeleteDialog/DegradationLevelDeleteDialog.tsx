import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IConfiguration from "../../../models/IConfiguration";
import IDegradationLevel from "../../../models/IDegradationLevel";
import ILevelChange from "../../../models/ILevelChange";
import DecisionDialog from "../../decisionDialog/DecisionDialog";

export interface IDegradationLevelDeleteDialogProps {
    open: boolean;
    degradationLevels: IDegradationLevel[];
    onClose: () => void;
    onDeleteComplete: () => void;
}

const DegradationLevelDeleteDialog = (props: IDegradationLevelDeleteDialogProps) => {

    const {open, degradationLevels, onClose, onDeleteComplete} = props;

    const {configuration, updateConfiguration} = useConfigurationContext();

    const handleCancel = () => {
        onClose();
    };

    const handleDeletion = () => {
        const newConfiguration: IConfiguration = Object.assign({}, configuration);

        degradationLevels.forEach(dl => {
            // remove the levels
            newConfiguration.degradationLevels = newConfiguration.degradationLevels.filter(d => d.id !== dl.id).slice();

            // insert replacement level changes for every childnode in the tree (depends on the type: upgrade/degradation)

            //#region Handling of the degradations

            const indexDegradationLevelChange = newConfiguration.degradations.findIndex(d => d.startDegradationLevelId === dl.id);

            if(indexDegradationLevelChange !== -1){
                // the node is used in the tree for the degradations and therefore we have to update level changes

                const parentNodeId : number | null = newConfiguration.degradations[indexDegradationLevelChange].resultDegradationLevelId;

                // Find all LevelChanges that point to the current degradation level - required to be able to create new LevelChanges that point directly from the child to the parent of this level
                const childNodeLevelChanges = newConfiguration.degradations.filter(d => d.resultDegradationLevelId === dl.id).slice();

                newConfiguration.degradations = newConfiguration.degradations.filter(d => d.resultDegradationLevelId !== dl.id && d.startDegradationLevelId !== dl.id).slice();

                // add the new Level Changes
                for(const childNode of childNodeLevelChanges){

                    newConfiguration.degradations.push({
                        resultDegradationLevelId: parentNodeId,
                        startDegradationLevelId: childNode.startDegradationLevelId,
                        stateResultLevel: null,
                        stateStartLevel: childNode.stateStartLevel,
                    });
                }
            }

            //#endregion

            //#region Handling of the upgrades

            const indexUpgradeLevelChange = newConfiguration.upgrades.findIndex(d => d.startDegradationLevelId === dl.id);

            if(indexUpgradeLevelChange !== -1){
                // the node is used in the tree for the upgrades and therefore we have to update level changes

                console.warn("Deleting this level is not working properly because there are existing upgrades that have to be updated/deleted");
                /*

                HAS TO BE DONE

                const parentNodeId : number | null = newConfiguration.degradations[indexDegradationLevelChange].resultDegradationLevelId;

                // Find all LevelChanges that point to the current degradation level - required to be able to create new LevelChanges that point directly from the child to the parent of this level
                const childNodeLevelChanges = newConfiguration.degradations.filter(d => d.resultDegradationLevelId === dl.id).slice();

                newConfiguration.degradations = newConfiguration.degradations.filter(d => d.resultDegradationLevelId !== dl.id && d.startDegradationLevelId !== dl.id).slice();

                // add the new Level Changes
                for(const childNode of childNodeLevelChanges){

                    newConfiguration.degradations.push({
                        resultDegradationLevelId: parentNodeId,
                        startDegradationLevelId: childNode.startDegradationLevelId,
                        stateResultLevel: null,
                        stateStartLevel: childNode.stateStartLevel,
                    });
                }*/
            }

            //#endregion
        });

        updateConfiguration(newConfiguration);
        onDeleteComplete();
    };

    return (
        <DecisionDialog
            open={open}
            title={"Delete "+ degradationLevels.length + " items"}
            text="The selected items will be irreversibly deleted."
            onConfirmClick={handleDeletion}
            onCancelClick={handleCancel}
        />
    );
};

export default DegradationLevelDeleteDialog;
