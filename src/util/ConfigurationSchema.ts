const ConfigurationSchema = 
{
    "title": "SORRIRConfigurationSchema",
    "description": "Schema for a SORRIR configuration",
    "type": "object",
    "required": [ "subcomponents", "degradationLevels" ],
    "properties": {
        "subcomponents": {
            "description": "The subcomponents of the component of this configuration",
            "type": "array",
            "minItems": 0,
            "items": { "$ref": "#/$defs/subcomponent" }

        },
        "degradationLevels":{
            "description": "The degradation levels of the component",
            "type": "array",
            "minItems": 0,
            "items": { "$ref": "#/$defs/degradationLevel" }
        }        
    },
    "$defs": {
        "subcomponent": {
            "type": "object",
            "description": "A subcomponent",
            "required": [ "id", "name", "shadowmodes" ],
            "properties": {
                "id": {
                    "type": "string",
                    "description": "The id of a subcomponent, has to be unique for each subcomponent",
                },
                "name": {
                    "type": "string",
                    "description": "The name of a subcomponent",
                },
                "shadowmodes":{
                    "type": "array",
                    "description": "The name of a subcomponent",
                    "minItems": 0,
                    "items": { "$ref": "#/$defs/shadowmode" }
                }
            }
        },
        "degradationLevel": {
            "type": "object",
            "description": "A degradation level from a component",
            "required": [ "id", "name", "dependencies" ],
            "properties": {
                "id": {
                    "type": "number",
                    "description": "The id of a degradation level, has to be unique",
                },
                "name": {
                    "type": "string",
                    "description": "The name of a degradation level",
                },
                "dependencies":{
                    "type": "array",
                    "description": "The dependencies for a degradation level",
                    "minItems": 0,
                    "items": { "$ref": "#/$defs/degradationLevelDependency" }
                }
            }
        },
        "shadowmode": {
            "type": "object",
            "description": "A subcomponent",
            "required": [ "id", "name"],
            "properties": {
                "id": {
                    "type": "string",
                    "description": "The id of a shadowmode, has to be unique for each shadowmode of a component",
                },
                "name": {
                    "type": "string",
                    "description": "The name of shadowmode",
                },
            }
        },
        "degradationLevelDependency":{
            "type": "object",
            "description": "A dependency of a degradation level",
            "required": [ "subcomponentId", "shadowmodeId"],
            "properties": {
                "subcomponentId": {
                    "type": "string",
                    "description": "The id of a subcomponent of the component",
                },
                "shadowmodeId": {
                    "type": "string",
                    "description": "The id of a shadowmode of a subcomponent",
                },
            }
        }
    }
};

export default ConfigurationSchema;