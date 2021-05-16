export enum AvailableViews {

    'WelcomeView' = 0,
    'ComponentConfigurationView' = 1,
    'ConfigurationImportView' = 2,
    'ConfigurationExportView' = 3
}

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
        default:
            return "Label for view not specified";
    }
}

export const GetNewConfigurationViews = () => {
    const views: AvailableViews[] = [
        AvailableViews.ComponentConfigurationView,
        AvailableViews.ConfigurationExportView,
    ];
    return views;
}

export const GetImportConfigurationViews = () => {
    const views: AvailableViews[] = [
        AvailableViews.ConfigurationImportView,
        AvailableViews.ComponentConfigurationView,
        AvailableViews.ConfigurationExportView,
    ];
    return views;
}