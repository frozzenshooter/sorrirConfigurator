import { useEffect } from "react";
import { useCallback, useState } from "react";
import IDegradationLevel from "../../../models/IDegradationLevel";
import ILevelChange from "../../../models/ILevelChange";
import GetSubtree, { ISubtreeResult, SubtreeType } from "./Subtree";

export enum DegradationLevelTreeType {
    Degradation = 0,
    Upgrade = 1
}

export interface IDegradationLevelTreeProps {
    degradationLevels: IDegradationLevel[]; // presort the relevant levels to just have to do it once
    levelChanges: ILevelChange[];
    onSelectionChanged: (selected: IDegradationLevel) => void;
    selectedDegradationLevels: IDegradationLevel[];
    degradationLevelTreeType: DegradationLevelTreeType;
}

const DegradationLevelTree = (props: IDegradationLevelTreeProps) => {

    // Reason for not using subtree directly: we want to be able to set the default OFF state and also calculate the tree recursively

    const {degradationLevels, levelChanges, degradationLevelTreeType, selectedDegradationLevels, onSelectionChanged} = props;

    //TESTDATA
    let testlevels :IDegradationLevel[] = [
        {
            "id": 0,
            "label": "Test 0",
            "dependencies": [],
            "states": []
        },
        {
            "id": 1,
            "label": "Test 1",
            "dependencies": [],
            "states": []
        },
        {
            "id": 2,
            "label": "Test 2",
            "dependencies": [],
            "states": []
        }
        ,
        {
            "id": 3,
            "label": "Test 2",
            "dependencies": [],
            "states": []
        }
        ,
        {
            "id": 4,
            "label": "Test 2",
            "dependencies": [],
            "states": []
        }
        ,
        {
            "id": 5,
            "label": "Test 2",
            "dependencies": [],
            "states": []
        }
        ,
        {
            "id": 6,
            "label": "Test 2",
            "dependencies": [],
            "states": []
        }
    ]

    let testlevelChg : ILevelChange[]  = [
        {
            startDegradationLevelId: 0, 
            stateStartLevel: "start", 
            resultDegradationLevelId: null, 
            stateResultLevel: "result"
        },
        {
            startDegradationLevelId: 1, 
            stateStartLevel: "start", 
            resultDegradationLevelId: null, 
            stateResultLevel: "result"
        },
        {
            startDegradationLevelId: 2, 
            stateStartLevel: "start", 
            resultDegradationLevelId: 1, 
            stateResultLevel: "result"
        },
        {
            startDegradationLevelId: 3, 
            stateStartLevel: "start", 
            resultDegradationLevelId: 2, 
            stateResultLevel: "result"
        },
        {
            startDegradationLevelId: 4, 
            stateStartLevel: "start", 
            resultDegradationLevelId: 2, 
            stateResultLevel: "result"
        },
        {
            startDegradationLevelId: 5, 
            stateStartLevel: "start", 
            resultDegradationLevelId: 4, 
            stateResultLevel: "result"
        },
        {
            startDegradationLevelId: 6, 
            stateStartLevel: "start", 
            resultDegradationLevelId: 5, 
            stateResultLevel: "result"
        },
    ]; 
    

    // Calculate the subtree (including the width for the internal calculation)
    /*const subtreeResult = GetSubtree({
        degradationLevels: testlevels,
        levelChanges: testlevelChg,
        onSelectionChanged: onSelectionChanged,
        selectedDegradationLevels: selectedDegradationLevels,
        subtreeType: degradationLevelTreeType === DegradationLevelTreeType.Degradation ? SubtreeType.Degradation : SubtreeType.Upgrade,
    });*/

    const [result, setResult] = useState<ISubtreeResult>();

    /*const subtreeResult = useCallback(() => GetSubtree({
        degradationLevels: degradationLevels,
        levelChanges: levelChanges,
        onSelectionChanged: onSelectionChanged,
        selectedDegradationLevels: selectedDegradationLevels,
        subtreeType: degradationLevelTreeType === DegradationLevelTreeType.Degradation ? SubtreeType.Degradation : SubtreeType.Upgrade,
    }), [degradationLevels, levelChanges]);*/

    useEffect(() => {
        const subtreeResult = GetSubtree({
            degradationLevels: degradationLevels,
            levelChanges: levelChanges,
            onSelectionChanged: onSelectionChanged,
            selectedDegradationLevels: selectedDegradationLevels,
            subtreeType: degradationLevelTreeType === DegradationLevelTreeType.Degradation ? SubtreeType.Degradation : SubtreeType.Upgrade,
        });
        setResult(subtreeResult);
    }, [degradationLevels, levelChanges])

    return (
        <>
            {result?.node}
        </>
    );
};

export default DegradationLevelTree;