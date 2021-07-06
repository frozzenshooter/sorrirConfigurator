import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IConfiguration from "../../../models/IConfiguration";
import IDegradationLevel from "../../../models/IDegradationLevel";
import LevelChangeDeletion, { LevelChangeDeletionType } from "../../../util/LevelChangeDeletion";
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
        let newConfiguration: IConfiguration = Object.assign({}, configuration);

        degradationLevels.forEach(dl => {
            // remove the levels
            newConfiguration.degradationLevels = newConfiguration.degradationLevels.filter(d => d.id !== dl.id).slice();

            // insert replacement level changes for every childnode in the tree (depends on the type: upgrade/degradation)

            //#region Handling of the degradations

            newConfiguration = LevelChangeDeletion(newConfiguration, LevelChangeDeletionType.Degradation, dl);
            
            //#endregion

            //#region Handling of the upgrades

            newConfiguration = LevelChangeDeletion(newConfiguration, LevelChangeDeletionType.Degradation, dl);

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
