import { constants } from 'os';
import { useConfigurationContext } from '../../context/ConfigurationContext';
import IDegradationLevel from '../../models/IDegradationLevel';
import DegradationLevelTree from '../degradationLevelConfigurationView/DegradationLevelHierarchyEditor/DegradationLevelTree';
import './DegradationLevelHierarchyEditor.css';
import DegradationLevelNode from './DegradationLevelNode/DegradationLevelNode';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export interface DegradationLevelHierarchyEditorProps {
    selectedDegradationLevels: IDegradationLevel[];
    onSelectionChanged: (selected: IDegradationLevel) => void;
}

const DegradationLevelHierarchyEditor =  (props: DegradationLevelHierarchyEditorProps) => {

    const t = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    const {onSelectionChanged, selectedDegradationLevels} = props;

    const {configuration} = useConfigurationContext();
    
    // only get the start values because every level has to be at least one time the start of an arrow because all result in the off state
    const levelIds = configuration.degradations.map(d => d.startDegradationLevelId);
    

    const unsortedLevels: IDegradationLevel[] = [];
    const sortedLevels: IDegradationLevel[] = [];

    for(const degradationLevel of configuration.degradationLevels){
        const index = levelIds.findIndex(id => id === degradationLevel.id); 
        if(index != -1){   
            sortedLevels.push(degradationLevel);
        }else{
            unsortedLevels.push(degradationLevel);
        }
    }

    const isSelected = (id: number) => {
        const index = selectedDegradationLevels.findIndex(d => d.id === id);

        return index !== -1;
    }

    return (
        <DndProvider backend={HTML5Backend}>
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
                        <DegradationLevelTree />
                    </div>
                </div>
        </DndProvider>
    );
};

export default DegradationLevelHierarchyEditor;
