import { Button } from "@material-ui/core";
import { useConfigurationContext } from "../../../context/ConfigurationContext";

export const FileExporter = () => {

    const {configuration} = useConfigurationContext();

    const href= "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration));
    
    return (
        <Button variant="contained" color="primary" href={href} download="configuration.json" >
            DOWNLOAD CONFIGURATION
        </Button>
    );
}