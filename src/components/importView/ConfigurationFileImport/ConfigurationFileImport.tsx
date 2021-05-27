import { Button } from "@material-ui/core";
import React from "react";
import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IConfiguration from "../../../models/IConfiguration";
import Alert from '@material-ui/lab/Alert';
import './ConfigurationFileImport.css';
import ConfigurationValidator from "../../../util/ConfigurationValidator";

const ConfigurationFileImport = () => {

    const {updateConfiguration} = useConfigurationContext();
    const [error, setError] = React.useState<string>("");
    const [filename, setFilename] = React.useState<string>("");


    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if(event?.target?.files !== null && event.target.files.length > 0){
            const newFilename = event.target.files[0].name;  
            
            //TODO: is there a cleaner way to solve this ?
            const reader = new FileReader();
            reader.onload = () => {
                if(!reader.error){
                    const jsonData = reader.result?.toString();
                    if(jsonData){

                        const validator = ConfigurationValidator.getInstance();
                        const errors = validator.parseAndValidate(jsonData);
                        
                        if(errors.length > 0) {

                            setError(errors.join('\n'));
                        }else{
                            updateConfiguration(validator.getParsedConfiguration());
                            setError("");
                        }
                        setFilename(newFilename);
                    }
                }
            }
            reader.readAsText(event.target.files[0]);
        }
    };

    return (
        <div id="configuration-file-import-container">
                <div id="configuration-file-import-button-container">              
                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                    >

                        UPLOAD CONFIGURATION

                        <input
                            hidden={true}
                            type="file"
                            onInput={onFileChange}
                            multiple={false}
                            value={""}
                        />

                    </Button>
                    {filename !== ""? <div className="configuration-file-import-button-container-item">Filename: <strong>{filename}</strong></div>: null}
                    <span id="configuration-file-import-note">(This will override the current configuration with the data from the uploaded file)</span>
                </div>
                {error !== ""? <div id="configuration-file-import-alert"><Alert severity="error">{error}</Alert></div>: null}

        </div>
    );
}

export default ConfigurationFileImport;