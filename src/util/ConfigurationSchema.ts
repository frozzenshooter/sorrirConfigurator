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
                    "description": "The shadowmodes of a subcomponent",
                    "minItems": 0,
                    "items": { "$ref": "#/$defs/shadowmode" }
                }
            }
        },
        "degradationLevel": {
            "type": "object",
            "description": "A degradation level from a component",
            "required": [ "id", "label", "dependencySets", "states" ],
            "properties": {
                "id": {
                    "type": "number",
                    "description": "The id of a degradationLevel, has to be unique",
                },
                "label": {
                    "type": "string",
                    "description": "The label of a degradationLevel",
                },
                "dependencySets":{
                    "type": "array",
                    "description": "The dependency sets for a degradation level",
                    "minItems": 0,
                    "items": { "$ref": "#/$defs/degradationLevelDependencySet" }
                },
                "states":{
                    "type": "array",
                    "description": "The states of this degradation level",
                    "minItems": 0,
                    "items": { "$ref": "#/$defs/degradationLevelState" }
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
        "degradationLevelDependencySet":{
            "type": "object",
            "description": "A dependency set of a degradation level",
            "required": [ "id", "dependencies"],
            "properties": {
                "id": {
                    "type": "number",
                    "description": "The id of this set",
                },
                "dependencies": {
                    "type": "array",
                    "description": "The dependencies of this set",
                    "minItems": 0,
                    "items": { "$ref": "#/$defs/degradationLevelDependency" }
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
        "degradationLevelState":{
            "type": "object",
            "description": "A state of a degradation level",
            "required": [ "id", "name"],
            "properties": {
                "id": {
                    "type": "string",
                    "description": "The id of the state, has to be unique for each state of a degradation level",
                },
                "name": {
                    "type": "string",
                    "description": "The name of the state",
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
                    "type": ["string", "null"],
                    "description": "The id of the state of the start degradationLevel",
                },
                "resultStateId": {
                    "type": ["string", "null"],
                    "description": "The id of the state of the result degradationLevel",
                },
            }
        },

    }
};

export default ConfigurationSchema;