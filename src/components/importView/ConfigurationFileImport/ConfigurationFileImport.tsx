import { Button, Paper } from "@material-ui/core";
import React from "react";
import { useConfigurationContext } from "../../../context/ConfigurationContext";
import IConfiguration from "../../../models/IConfiguration";
import Alert from '@material-ui/lab/Alert';
import './ConfigurationFileImport.css';

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
                        // Only handle data if there is valid data                      
                        try{
                            const loadedConfig : IConfiguration = JSON.parse(jsonData);

                            //TODO: validate the input?
                            updateConfiguration(loadedConfig);
                            setError("");
                        }catch(ex){
                    
                            setError((ex as Error).message);
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
                </div>
                {error !== ""? <div id="configuration-file-import-alert"><Alert severity="error">{error}</Alert></div>: null}

        </div>
    );
}

export default ConfigurationFileImport;