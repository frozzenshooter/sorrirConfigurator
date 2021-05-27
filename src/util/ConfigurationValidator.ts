import Ajv, { ValidateFunction } from "ajv";
import IConfiguration from "../models/IConfiguration";
import ConfigurationSchema from "./ConfigurationSchema";

class ConfigurationValidator {
    private static instance: ConfigurationValidator;

    private validationFunction: ValidateFunction<IConfiguration>;

    private constructor() { 
        // only compile the validation once
        const ajv = new Ajv();
        this.validationFunction = ajv.compile<IConfiguration>(ConfigurationSchema);
    }

    public static getInstance(): ConfigurationValidator {
        if (!ConfigurationValidator.instance) {
            ConfigurationValidator.instance = new ConfigurationValidator();
        }

        return ConfigurationValidator.instance;
    }

    
    public validate(data: IConfiguration): string[]{
        const errors: string[] = [];

        const isValid = this.validationFunction(data);

        if(!isValid){
            for(let e in this.validationFunction.errors){
                errors.push(e);
            }
        }

        return errors;
    }

}

export default ConfigurationValidator;