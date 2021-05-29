import { Button } from '@material-ui/core';
import './DegradationLevelHierarchyEditor.css';

export interface IDegradationLevelHierarchyEditorProps{

}

const DegradationLevelHierarchyEditor = (props: IDegradationLevelHierarchyEditorProps) => {

    const t = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    return (
        <div id="degradation-level-hierarchy-editor-container">
            <div id="degradation-level-hierarchy-editor-sidebar">
                <div id="degradation-level-hierarchy-editor-sidebar-title">
                    Unsorted degradation levels
                </div>
                <div id="degradation-level-hierarchy-editor-sidebar-content">
                    {t.map((s)=>{
                        return (
                            <div className="degradation-level-hierarchy-editor-sidebar-item">
                                Item {s}
                            </div>
                            );
                    })
                    }
                </div>
            </div>
            <div id="degradation-level-hierarchy-editor-tree-container">

                <div id="degradation-level-hierarchy-editor-tree-container-content-test">
                    <Button onClick={() => {
                        const ele = document.getElementById("degradation-level-hierarchy-editor-tree-container-content-test");
                        if(ele){
                            const height = ele.offsetHeight;
                            if(height){
                                ele.style.height = (height + 50)+"px";
                            }
                        }
                    }}>
                        Add bottom
                    </Button>
                    <Button onClick={() => {
                        const ele = document.getElementById("degradation-level-hierarchy-editor-tree-container-content-test");
                        if(ele){
                            const width = ele.offsetWidth;
                            if(width){
                                ele.style.width = (width + 50)+"px";
                            }
                        }
                    }}>
                        Add right
                    </Button>
                </div>
            </div>
        </div>
    );



};


export default DegradationLevelHierarchyEditor;