import './DegradationGraphEditor.css';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React from 'react';


interface movableProps {
    setIsFirstColumn: (isFirst: boolean) => void
}

interface DropResult {
    name: string
}

const MovableItem = (props: movableProps) => {
    const {setIsFirstColumn} = props;

    const [{isDragging}, drag] = useDrag({
        type: 'Our first type',
        item: {name: 'Any custom name'},
        end: (item, monitor) => {
            const dropResult: DropResult = monitor.getDropResult() as DropResult;
            if(dropResult && dropResult.name === 'Column 1'){
                setIsFirstColumn(true)
            } else {
                setIsFirstColumn(false);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{opacity}}>
            We will move this item
        </div>
    )
}

interface colProps {
    children: React.ReactNode,
    className: string,
    title: string
}

const Column = (props: colProps) => {

    const {children, className, title} = props;

    const [, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: title}),
    });

    return (
        <div ref={drop} className={className}>
            {title}
            {children}
        </div>
    )
}

const DegradationGraphEditor = () => {

    const [isFirstColumn, setIsFirstColumn] = React.useState(true);

    const Item = <MovableItem setIsFirstColumn={setIsFirstColumn}/>;

    return (
        <div id="degradation-graph-editor-container">
            <div className="degradation-columns-container">       
                <DndProvider backend={HTML5Backend}>
                    <Column title='Column 1' className='column first-column'>
                        {isFirstColumn && Item}
                    </Column>
                    <Column title='Column 2' className='column second-column'>
                        {!isFirstColumn && Item}
                    </Column>
                </DndProvider>         
            </div>
        </div>
    );
};

export default DegradationGraphEditor;