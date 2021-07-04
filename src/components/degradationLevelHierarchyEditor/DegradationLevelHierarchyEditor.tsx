import { useConfigurationContext } from '../../context/ConfigurationContext';
import IDegradationLevel from '../../models/IDegradationLevel';
import './DegradationLevelHierarchyEditor.css';
import DegradationLevelNode from './DegradationLevelNode/DegradationLevelNode';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DegradationLevelTree, { DegradationLevelTreeType } from './DegradationLevelTree/DegradationLevelTree';
import IConfiguration from '../../models/IConfiguration';
import { useEffect, useState } from 'react';

export enum DegradationLevelHierarchyEditorType {
    Degradation = 0,
    Upgrade = 1
}

export interface DegradationLevelHierarchyEditorProps {
    selectedDegradationLevels: IDegradationLevel[];
    onSelectionChanged: (selected: IDegradationLevel) => void;
    degradationLevelHierarchyEditorType: DegradationLevelHierarchyEditorType;
}

const DegradationLevelHierarchyEditor =  (props: DegradationLevelHierarchyEditorProps) => {

    const {onSelectionChanged, selectedDegradationLevels, degradationLevelHierarchyEditorType} = props;

    const {configuration} = useConfigurationContext();

    // only get the start values because every level has to be at least one time the start of an arrow because all result in the off state
    const levelIds = configuration.degradations.map(d => d.startDegradationLevelId);
    
    // Presort the DegradationLevels
    const unsortedLevels: IDegradationLevel[] = [];
    const sortedLevels: IDegradationLevel[] = [];

    for(const degradationLevel of configuration.degradationLevels){
        const index = levelIds.findIndex(id => id === degradationLevel.id); 
        if(index !== -1){   
            sortedLevels.push(degradationLevel);
        }else{
            unsortedLevels.push(degradationLevel);
        }
    }

    const isSelected = (id: number) => {
        const index = selectedDegradationLevels.findIndex(d => d.id === id);
        return index !== -1;
    }

    return (<DndProvider backend={HTML5Backend}>
                <div id="degradation-level-hierarchy-editor-container">
                    {unsortedLevels.length > 0 ?
                        (<div id="degradation-level-hierarchy-editor-sidebar">
                            <div id="degradation-level-hierarchy-editor-sidebar-title">
                                Unsorted
                            </div>
                            <div id="degradation-level-hierarchy-editor-sidebar-content">
                                {unsortedLevels.map((ul)=>{
                                        return (
                                            <DegradationLevelNode
                                                isSelected={isSelected(ul.id)}
                                                degradationLevel={ul}
                                                onSelectionChanged={onSelectionChanged}
                                                key={ul.id}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>)
                    :
                        null
                    }
                    <div id="degradation-level-hierarchy-editor-tree-container">
                        <DegradationLevelTree
                                degradationLevels={sortedLevels}
                                levelChanges={degradationLevelHierarchyEditorType === DegradationLevelHierarchyEditorType.Degradation ? configuration.degradations : configuration.upgrades}
                                onSelectionChanged={onSelectionChanged}
                                selectedDegradationLevels={selectedDegradationLevels}
                                degradationLevelTreeType={degradationLevelHierarchyEditorType === DegradationLevelHierarchyEditorType.Degradation ? DegradationLevelTreeType.Degradation : DegradationLevelTreeType.Upgrade}
                            />
                        
                    </div>
                </div>
            </DndProvider>
    );
};

export default DegradationLevelHierarchyEditor;
