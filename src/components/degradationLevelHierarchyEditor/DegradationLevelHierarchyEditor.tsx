import IDegradationLevel from '../../models/IDegradationLevel';
import DegradationLevelTree from '../degradationLevelConfigurationView/DegradationLevelHierarchyEditor/DegradationLevelTree';
import './DegradationLevelHierarchyEditor.css';


export interface DegradationLevelHierarchyEditorProps {
    selectedDegradationLevels: IDegradationLevel[];
    onSelectionChanged: (selected: IDegradationLevel) => void;
}

const DegradationLevelHierarchyEditor =  (props: DegradationLevelHierarchyEditorProps) => {

    const t = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    const {onSelectionChanged, selectedDegradationLevels} = props;

    const isSelected = (id: number) => {
        const index = selectedDegradationLevels.findIndex(d => d.id === id);

        return index !== -1;
    }

    return (
        <div id="degradation-level-hierarchy-editor-container">
            <div id="degradation-level-hierarchy-editor-sidebar">
                <div id="degradation-level-hierarchy-editor-sidebar-title">
                    Unsorted degradation levels
                </div>
                <div id="degradation-level-hierarchy-editor-sidebar-content">
                    {t.map((s)=>{

                           if(isSelected(s)){
                               return (<div className="degradation-level-hierarchy-editor-sidebar-item" 
                                        style={{backgroundColor: "rgba(245, 0, 87, 0.08)"}}
                                        onClick={() => {
                                            onSelectionChanged({
                                                id: +s,
                                                dependencies: [],
                                                label: "id"+s,
                                                states: []
                                            });
                                        }}
                                    >
                                        Item {s}
                                    </div>)
                           }else{
                                return (<div className="degradation-level-hierarchy-editor-sidebar-item" 
                                onClick={() => {
                                    onSelectionChanged({
                                        id: +s,
                                        dependencies: [],
                                        label: "id"+s,
                                        states: []
                                    });
                                }}
                                >
                                Item {s}
                                </div>)
                           }                                
                        })
                    }
                </div>
            </div>
            <div id="degradation-level-hierarchy-editor-tree-container">
                <DegradationLevelTree />
            </div>
        </div>
    );
};

export default DegradationLevelHierarchyEditor;
