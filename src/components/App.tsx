import React from 'react';
import { ViewProps, Wizard, View } from './wizard/Wizard';
import Button from '@material-ui/core/Button';

function App() {

  const view1: View = 
    {title: "view1", 
      element: (viewProps: ViewProps) => {
      return (
      <div>
          <p>View 1</p>
          <Button variant="contained" color="primary" onClick={() => viewProps.showNextView()}>
            Go Next
          </Button>
          <Button variant="contained" color="primary" onClick={() => viewProps.showPreviousView()}>
            Go Previous
          </Button>
          <Button variant="contained" color="primary" onClick={() => {
            viewProps.showView(2);}}>
            Go to View 3
          </Button>
        </div>
      );} 
    };

  const view2: View = 
  {title: "view2", 
    element: (viewProps: ViewProps) => {
    return (
    <div>
        <p>View 2</p>
        <Button variant="contained" color="primary" onClick={() => viewProps.showNextView()}>
          Go Next
        </Button>
        <Button variant="contained" color="primary" onClick={() => viewProps.showPreviousView()}>
          Go Previous
        </Button>
        <Button variant="contained" color="primary" onClick={() => {
          viewProps.showView(2);}
        }>
          Go to View 3
        </Button>
      </div>
    );} 
  };

  const view3: View = 
  {title: "view3", 
    element: (viewProps: ViewProps) => {
    return (
    <div>
        <p>View 3</p>
        <Button variant="contained" color="primary" onClick={() => viewProps.showNextView()}>
          Go Next
        </Button>
        <Button variant="contained" color="primary" onClick={() => viewProps.showPreviousView()}>
          Go Previous
        </Button>
        <Button variant="contained" color="primary" onClick={() => {
          viewProps.showView(0);}
        }>
          Go to View 1
        </Button>
      </div>
    );} 
  };

  return (
    <Wizard
    views = {[view1, view2, view3]}
    ></Wizard>
  );
}

export default App;
