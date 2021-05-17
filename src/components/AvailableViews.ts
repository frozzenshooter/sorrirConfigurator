import IConfiguration from "../interfaces/IConfiguration";
import { IWizardState } from "./wizard/Wizard";

export enum AvailableViews {

    'WelcomeView' = 0,
    'ComponentConfigurationView' = 1,
    'ConfigurationImportView' = 2,
    'ConfigurationExportView' = 3,
    'DegradationConfigurationView' = 4
}

/**
 * Resolves the label of a view
 * 
 * @param view 
 * @returns 
 */
export const ResolveViewLabel = (view: AvailableViews) => {

    switch(view){
        case AvailableViews.WelcomeView:
            return "SORRIR Configurator";
        case AvailableViews.ConfigurationImportView:
            return "Configuration Import";
        case AvailableViews.ComponentConfigurationView:
            return "SubComponent Configuration";
        case AvailableViews.ConfigurationExportView:
            return "Configuration Export";
        case AvailableViews.DegradationConfigurationView:
            return "Degradation Configuration";
        default:
            return "Label for view not specified";
    }
}

/**
 * Returns an array with all views for a new configuration (index as the order of the steps)
 * 
 * @returns 
 */
export const GetNewConfigurationViews = () => {
    const views: AvailableViews[] = [
        AvailableViews.ComponentConfigurationView,
        AvailableViews.DegradationConfigurationView,
        AvailableViews.ConfigurationExportView,
    ];
    return views;
}

/**
 * Returns an array with all views for a loaded configuration (index as the order of the steps)
 * 
 * @returns 
 */
export const GetImportConfigurationViews = () => {
    const views: AvailableViews[] = [
        AvailableViews.ConfigurationImportView,
        AvailableViews.ComponentConfigurationView,        
        AvailableViews.DegradationConfigurationView,
        AvailableViews.ConfigurationExportView,
    ];
    return views;
}

/**
 * Returns an inital (empty) configuration
 * 
 * @returns 
 */
export const getInitalConfiguration = () => {
    const initConfig: IConfiguration = {
        isShadowModeGranularityFine : false,
        subComponents: []
    };
    return initConfig;
}

/*
 * TODO: REMOVE THESE FUNCTIONS
 */
export const getInitalDevelopmentConfiguration = () => {
    const initConfig: IConfiguration = {
        isShadowModeGranularityFine : false,
        subComponents: [
            {
                id: "Subcomponent1",
                name: "Subcomponent1",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    },
                    {
                        id: "3",
                        name: "DC"
                    }
                ]
            },
            {
                id: "Subcomponent2",
                name: "Subcomponent2",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    }
                ]
            },
            {
                id: "Subcomponent3",
                name: "Subcomponent3",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    },
                    {
                        id: "3",
                        name: "DC"
                    }
                ]
            },
            {
                id: "Subcomponent4",
                name: "Subcomponent4",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    }
                ]
            },
            {
                id: "Subcomponent5",
                name: "Subcomponent5",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    },
                    {
                        id: "3",
                        name: "DC"
                    }
                ]
            },
            {
                id: "Subcomponent6",
                name: "Subcomponent6",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    }
                ]
            }]
    };
    return initConfig;
}

export const getDevelopmentInitalConfiguration = (): IWizardState => {
    return  {
        activeView: AvailableViews.WelcomeView,
        views: GetNewConfigurationViews(),
        configuration: {
            isShadowModeGranularityFine: false,
            subComponents: [
            {
                id: "Subcomponent1",
                name: "Subcomponent1",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    },
                    {
                        id: "3",
                        name: "DC"
                    }
                ]
            },
            {
                id: "Subcomponent2",
                name: "Subcomponent2",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    }
                ]
            },
            {
                id: "Subcomponent3",
                name: "Subcomponent3",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    },
                    {
                        id: "3",
                        name: "DC"
                    }
                ]
            },
            {
                id: "Subcomponent4",
                name: "Subcomponent4",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    }
                ]
            },
            {
                id: "Subcomponent5",
                name: "Subcomponent5",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    },
                    {
                        id: "3",
                        name: "DC"
                    }
                ]
            },
            {
                id: "Subcomponent6",
                name: "Subcomponent6",
                shadowmodes: [
                    {
                        id: "1",
                        name:"ON"

                    },
                    {
                        id: "2",
                        name: "OFF"
                    }
                ]
            }
        ]}          
    };
}