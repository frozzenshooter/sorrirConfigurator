import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IConfiguration from "../../../models/IConfiguration";
import IDegradationLevel from "../../../models/IDegradationLevel";
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
        const newConfiguration: IConfiguration = JSON.parse(JSON.stringify(configuration));

        degradationLevels.forEach(dl => {
            newConfiguration.degradationLevels = newConfiguration.degradationLevels.filter(d => d.id !== dl.id).slice();
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
