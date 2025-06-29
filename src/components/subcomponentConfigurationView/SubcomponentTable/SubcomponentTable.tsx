import ISubcomponent from "../../../models/ISubcomponent";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import React from "react";
import Order from "./Order";
import SubComponentTableToolbar from "./SubcomponentTableToolbar";
import SubComponentTableHead from "./SubcomponentTableHead";
import useStyles from "./SubcomponentTableStyles";
import { getComparator, stableSort } from "./SubcomponentHelperFunctions";
import { useConfigurationContext } from "../../../context/ConfigurationContext";
import './SubcomponentTable.css';
import DecisionDialog from "../../decisionDialog/DecisionDialog";
import IConfiguration from "../../../models/IConfiguration";
import SubcomponentDialog from "../SubcomponentDialog/SubcomponentDialog";
import SubcomponentDialogType from "../SubcomponentDialog/SubcomonentDialogType";

const SubComponentTable = () => {

    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ISubcomponent>('name');
    const [selected, setSelected] = React.useState<ISubcomponent[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const {configuration, updateConfiguration} = useConfigurationContext(); 

    //#region Selection and Sorting
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ISubcomponent) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = configuration.subcomponents.slice();
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleClick = (event: React.MouseEvent<unknown>, subcomponent: ISubcomponent) => {

        const selectedIndex = selected.findIndex(s => s.id === subcomponent.id);
        let newSelected: ISubcomponent[] = [];

        if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, subcomponent);
        } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
        }

        setSelected(newSelected);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (subcomponentId: string) => selected.findIndex(s => s.id === subcomponentId) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, configuration.subcomponents.length - page * rowsPerPage);

    //#endregion

    //#region Subcomponent deletion

    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState<boolean>(false);

    const handleSubComponentDeletion = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = () => {
        const newConfiguration : IConfiguration = Object.assign({}, configuration);
        newConfiguration.subcomponents = configuration.subcomponents.filter(subcomponent => !isSelected(subcomponent.id)).slice();

        // Delete all the dependencies in the degradationLevels too
        for(let degradationLevelIndex=0; degradationLevelIndex < newConfiguration.degradationLevels.length; degradationLevelIndex++){

          for(let dependencySetIndex = 0; dependencySetIndex < newConfiguration.degradationLevels[degradationLevelIndex].dependencySets.length; dependencySetIndex++){
            newConfiguration.degradationLevels[degradationLevelIndex].dependencySets[dependencySetIndex].dependencies = newConfiguration.degradationLevels[degradationLevelIndex].dependencySets[dependencySetIndex].dependencies.filter(dep => {
              return !isSelected(dep.subcomponentId);
            }).slice();
          }

        }

        setSelected([]);
        setDeleteDialogOpen(false);
        updateConfiguration(newConfiguration);
    };

    //#endregion
    
    //#region Subcomponent creation

    const [createDialogOpen, setCreateDialogOpen] = React.useState<boolean>(false);

    const handleSubcomponentCreateDialogClose = () => {
        setCreateDialogOpen(false);
        setSelected([]);
    };

    const handleSubcomponentCreation = () => {
        setCreateDialogOpen(true);
    };

    //#endregion

    //#region Subcomponent edit

    const [editDialogOpen, setEditDialogOpen] = React.useState<boolean>(false);

    const handleSubcomponentEdit = () => {
            if(selected.length === 1){
                setEditDialogOpen(true);
            }
    };
    
    const handleSubcomponentEditDialogClose= () => {
        setEditDialogOpen(false);
        setSelected([]);
    };

    //#endregion

    const SubComponentDialogResolver = () => {
        if(selected.length === 1){
            return (
                <>
                    <DecisionDialog 
                        title={"Delete "+ selected.length + " item"}
                        text="The selected item will be irreversibly deleted."
                        open={deleteDialogOpen}
                        onCancelClick={handleDeleteCancel}
                        onConfirmClick={handleDeleteConfirm}         
                        />              
                    <SubcomponentDialog 
                        open={editDialogOpen}
                        type={SubcomponentDialogType.Edit}
                        subcomponent={selected[0]}
                        onClose={handleSubcomponentEditDialogClose}/>
                </>
                );
        }else if(selected.length > 1){
            return (
                <>
                    <DecisionDialog 
                        title={"Delete "+ selected.length + " items"}
                        text="The selected items will be irreversibly deleted."
                        open={deleteDialogOpen}
                        onCancelClick={handleDeleteCancel}
                        onConfirmClick={handleDeleteConfirm}         
                        />
                </> 
                );
        }
        
    };

    //#endregion

    return(  <div className={classes.root}>
        <Paper className={classes.paper}>
          <SubComponentTableToolbar 
            numSelected={selected.length} 
            handleSubComponentDeletion={handleSubComponentDeletion} 
            handleSubComponentEdit={handleSubcomponentEdit}
            handleSubComponentCreation={handleSubcomponentCreation}/>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'medium'}
              aria-label="enhanced table"
            >
              <SubComponentTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={configuration.subcomponents.length}
              />
              <TableBody>
                {stableSort<ISubcomponent>(configuration.subcomponents, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subcomponent, index) => {
                    const isItemSelected = isSelected(subcomponent.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, subcomponent)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={subcomponent.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {subcomponent.id}
                        </TableCell>
                        <TableCell>{subcomponent.name}</TableCell>
                        <TableCell>
                            <ul className="subcomponent-table-shadowmode-list">
                                {subcomponent.shadowmodes.map((shadowmode)=> {
                                        return (
                                        <li key={shadowmode.id} className="subcomponent-table-shadowmode-list-item">
                                            <Chip label={shadowmode.name} />
                                        </li>);
                                    })
                                }
                            </ul>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={configuration.subcomponents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        {createDialogOpen === true ? 
                <SubcomponentDialog 
                    open={createDialogOpen}
                    type={SubcomponentDialogType.Create}
                    subcomponent={{id: "", name:"", shadowmodes: [{ "id": "Off", "name":"Off"}]}}
                    onClose={handleSubcomponentCreateDialogClose}
                />   
                : 
                null
        }
        { SubComponentDialogResolver() }

      </div>
    );
};

export default SubComponentTable;