import ReactFlow, { Background }  from 'react-flow-renderer';

const elements = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
    // you can also pass a React component as a label
    { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
  ];
  
const BasicFlow = () => 
<ReactFlow elements={elements}>
    <Background color="#aaa" gap={16} />
</ReactFlow>;


/**
 * Properties for the @DegradationGraph
 */
export interface IDegradationGraphProps{

}

/**
 * Interactive graph to allow the creation of the different degradation levels
 * 
 * @param props
 */
export const DegradationGraph = (props: IDegradationGraphProps) => {

    return (
        <BasicFlow/>
    );
}