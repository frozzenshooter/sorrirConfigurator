const ConfigurationSchema = 
{
    "title": "SORRIRConfigurationSchema",
    "description": "Schema for a SORRIR configuration",
    "type": "object",
    "required": [ "subcomponents", "degradationLevels", "degradations", "upgrades"],
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
        },
        "degradations":{
            "description": "The degradations of the component",
            "type": "array",
            "minItems": 0,
            "items": { "$ref": "#/$defs/levelChange" }
        },
        "upgrades":{
            "description": "The upgrades of the component",
            "type": "array",
            "minItems": 0,
            "items": { "$ref": "#/$defs/levelChange" }
        },
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
        },
        "levelChange":{
            "type": "object",
            "description": "A levelChange is either a upgrade or a degradation from on degradationLevel to another",
            "required": [ "startDegradationLevelId", "resultDegradationLevelId", "stateChanges" ],
            "properties": {
                "startDegradationLevelId": {
                    "type": "number",
                    "description": "The start degradationLevel of a levelChange",
                },
                "resultDegradationLevelId": {
                    "type": "number",
                    "description": "The degradationLevel in which the change results in",
                },
                "stateChanges":{
                    "type": "array",
                    "description": "The states changes from the start to the result degradationLevel",
                    "minItems": 0,
                    "items": { "$ref": "#/$defs/stateChange" }
                }
            }
        },
        "stateChange": {
            "type": "object",
            "description": "A stateChange contains the start state of a levelChange and the result state that the result degradationLevel will be in after the levelChange",
            "required": [ "startStateId", "resultStateId"],
            "properties": {
                "startStateId": {
                    "type": "string",
                    "description": "The id of the state of the start degradationLevel",
                },
                "resultStateId": {
                    "type": "string",
                    "description": "The id of the state of the result degradationLevel",
                },
            }
        },

    }
};

export default ConfigurationSchema;