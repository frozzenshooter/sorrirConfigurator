import GetDegradationLevelSubtree, { IDegradationLevelTreeNode }  from "./DegradationLevelSubtree";

export interface IDegradationLevelTreeProps{

}

const DegradationLevelTree = (props: IDegradationLevelTreeProps) => {

    const initNodes: IDegradationLevelTreeNode[] = [
        {
            id: 0,
            parentId: null,
            label: ""
        },
        {
            id: 1,
            parentId: 0,
            label: ""
        },
        {
            id: 2,
            parentId: 0,
            label: ""
        },
       {
            id: 3,
            parentId: 1,
            label: ""
        },
        {
            id: 4,
            parentId: 1,
            label: ""
        },
        {
            id: 5,
            parentId: 3,
            label: ""
        },
        {
            id: 6,
            parentId: 3,
            label: ""
        },
        {
            id: 7,
            parentId: 2,
            label: ""
        },
        {
            id: 8,
            parentId: 7,
            label: ""
        },
        /*{
            id: 9,
            parentId: 8,
            label: ""
        },
        {
            id: 10,
            parentId: 9,
            label: ""
        },*/
        {
            id: 11,
            parentId: 0,
            label: ""
        },
        {
            id: 12,
            parentId: 0,
            label: ""
        },
        {
            id: 13,
            parentId: 11,
            label: ""
        },
        {
            id: 14,
            parentId: 11,
            label: ""
        },
    ];

    const subtreeResult = GetDegradationLevelSubtree({id:0, nodes:initNodes});

    return (
        <>
            {subtreeResult.node}
        </>
    );

};

export default DegradationLevelTree;

