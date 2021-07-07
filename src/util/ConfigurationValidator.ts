import Ajv, { DefinedError, ValidateFunction } from "ajv";
import IConfiguration from "../models/IConfiguration";
import ConfigurationSchema from "./ConfigurationSchema";
import GetEmptyConfiguration from "./GetEmptyConfiguration";

class ConfigurationValidator {
    private static instance: ConfigurationValidator;

    private validationFunction: ValidateFunction<IConfiguration>;
    private parsedConfiguration: IConfiguration;

    private constructor() { 
        // only compile the validation once
        const ajv = new Ajv({allErrors: true});
        this.validationFunction = ajv.compile<IConfiguration>(ConfigurationSchema);
        this.parsedConfiguration = GetEmptyConfiguration();
    }

    public static getInstance(): ConfigurationValidator {
        if (!ConfigurationValidator.instance) {
            ConfigurationValidator.instance = new ConfigurationValidator();
        }

        return ConfigurationValidator.instance;
    }

    /**
     * Validate if a object has all values of the ConfigurationSchema
     * 
     * @param object 
     * @returns a list of errors - empty if valid object
     */
    public validate(object: IConfiguration): string[]{
        const errors: string[] = [];

        const isValid = this.validationFunction(object);

        if(!isValid){
            for (const err of this.validationFunction.errors as DefinedError[]) {
                if(err.message){
                    if(err.instancePath != null && err.instancePath !== ""){
                        errors.push("Validation: (" + err.instancePath + ") " + err.message);
                    }else{
                        errors.push("Validation: " + err.message);
                    }
                }
            }
        }

        return errors;
    }

    /**
     * Parses the string as IConfiguration (based on the ConfigurationSchema)
     * 
     * If there are no errors the resulting IConfiguration Object can be accessed via {@getParsedConfiguration}
     * 
     * @param data The data to be parsed and validated as string     
     * @returns a list of errors or an empty error if neither a parse error or a validation error was found 
     */
    public parseAndValidate(data: string): string[] {

        const errors: string[] = [];

        try{
            // This may result in an exception - and will be handled as error in the catch
            const parsedConfig : IConfiguration = JSON.parse(data);
   
            const isValid = this.validationFunction(parsedConfig);
            if(!isValid){

                for (const err of this.validationFunction.errors as DefinedError[]) {
                    if(err.message){
                        if(err.instancePath != null && err.instancePath !== ""){
                            errors.push("Validation: (" + err.instancePath + ") " + err.message);
                        }else{
                            errors.push("Validation: " + err.message);
                        }
                    }
                }
            }else{
                this.parsedConfiguration = parsedConfig;
            }

        }catch(ex){    
            errors.push("Json-Parsing: " + (ex as Error).message);
        }

        return errors;
    }

    /**
     * Get the last (successfully) parsed configuration
     * 
     * @returns 
     */
    public getParsedConfiguration(): IConfiguration{

        return this.parsedConfiguration;
    }

}

export default ConfigurationValidator;