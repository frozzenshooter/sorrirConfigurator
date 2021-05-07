import { Button } from '@material-ui/core';

export interface ConfigurationFileInput{
    handleChange: (filename: string, jsonData: string) => void;
    value: string;
}

/**
 * Input for a configuration file - handles the loading of the file and will call the handleChange function with the loaded data
 * 
 * @param props 
 * @returns 
 */
export const ConfigurationFileInput = (props: ConfigurationFileInput) => {
    const {handleChange, value} = props;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event?.target?.files !== null && event.target.files.length > 0){
            const filename = event.target.files[0].name;  

            //TODO: is there a cleaner way to solve this ?
            const reader = new FileReader();
            reader.onload = () => {
                if(!reader.error){
                    const jsonData = reader.result?.toString();
                    if(jsonData){
                        // Only handle data if there is valid data                      
                        handleChange(filename, jsonData);
                    }
                }
            }
            reader.readAsText(event.target.files[0]);
        }
    };

    return (
        <Button
            variant="contained"
            component="label"
            color="primary"
        >
            Upload json file
            <input
                hidden={true}
                type="file"
                onInput={handleFileChange}
                multiple={false}
                value={value}
            />
        </Button>
    );
}
