import { Paper } from "@material-ui/core";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./Constants";

import './TreeNode.css';

export interface ITreeNodeProps {
    left: number;
    top: number;
    id: number,
    label: string,
}

const TreeNode = (props:ITreeNodeProps) => {

    const {left, top, id, label} = props;

    return (
        <Paper 
            style={{
                top:top+"px", 
                left:left+"px", 
                width: (DEFAULT_WIDTH-32)+"px",
                height: (DEFAULT_HEIGHT)+"px",
                marginRight: "16px",
                marginLeft: "16px"
            }} 
            className="degradation-level-tree-node">

            <div className="degradation-level-tree-node-content">
                <div className="degradation-level-tree-node-content-label">
                    {label}
                </div>
            </div>
        </Paper>
    );
}

export default TreeNode;