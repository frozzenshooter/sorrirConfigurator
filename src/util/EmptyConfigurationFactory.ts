import IConfiguration from "../models/IConfiguration";

const EmptyConfigurationFactory = (): IConfiguration => {

    return {label: "empty"};
};

export default EmptyConfigurationFactory;