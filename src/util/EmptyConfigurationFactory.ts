import IConfiguration from "../models/IConfiguration";

const EmptyConfigurationFactory = (): IConfiguration => {

    return {subcomponents: []};
};

export default EmptyConfigurationFactory;