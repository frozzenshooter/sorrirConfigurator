import React from 'react';
import ISubcomponent from "../../interfaces/ISubcomponent";
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import clsx from 'clsx';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IShadowmode from '../../interfaces/IShadowmode';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';

/**
 * Order of the sorting
 */
type Order = 'asc' | 'desc';

/**
 * Compares two objects by a the value of a key
 * 
 * @param a first object of Type T
 * @param b second object of Type T
 * @param orderBy the key to ccompare the elements
 * @returns number with the descending order 
 */
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

/**
 * Returns a function that will work as comparator (ascending or a descending)  
 * 
 * @param order the order the comparator should sort by (asc | desc)
 * @param orderBy the key the values will be sorted by
 * @returns a comparator (function) for sorting
 */
function getComparator<Key extends keyof ISubcomponent>( order: Order, orderBy: Key)
    :(a: { [key in Key]: number | string | IShadowmode[]}, b: { [key in Key]: number | string | IShadowmode[]}) => number
{
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Sorts the array
 * 
 * @param array the array with the data to sort
 * @param comparator the compartor to sort
 * @returns sorted array
 */
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

/**
 * Data for the HeadCell
 */
interface HeadCell {
    id: keyof ISubcomponent;
    label: string;
}

/**
 * Defintion of the Headcells
 */
const headCells: HeadCell[] = [
    {id: "id", label: 'ID'},
    {id: "name", label: 'Name'},
    {id: "shadowmodes", label: 'Shadow Modes'}
];

interface SubComponentTableHeadProps{
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ISubcomponent) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

/**
 * Header of the SubComponentTable
 * 
 * @param props
 * @returns 
 */
function SubComponentTableHead(props: SubComponentTableHeadProps){
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property: keyof ISubcomponent) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

    return (
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                padding={'default'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
}

/**
 * 
 */
const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

/**
 * Properties for the SubComponentTableToolbar
 */
interface SubComponentTableToolbarProps {
    numSelected: number;
    handleSubComponentDeletion: () => void;
    handleSubComponentEdit: () => void;
    handleSubComponentCreation: () => void;
}

/**
 * Toolbar for the SubComponentTable
 * 
 * @param props SubComponentTableToolbarProps
 * @returns toolbar
 */
const SubComponentTableToolbar = (props: SubComponentTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, handleSubComponentDeletion, handleSubComponentEdit, handleSubComponentCreation} = props;

    return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {numSelected > 0 ? (
            <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Subcomponents
            </Typography>
          )}
          <Tooltip title="Create">
            <IconButton aria-label="Create" onClick={()=>{handleSubComponentCreation();}}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          { numSelected > 0 ? (
                numSelected === 1 ? 
                (   <div style={{display: "inline-flex"}}>
 
                        <Tooltip title="Edit">
                            <IconButton aria-label="edit" onClick={()=>{handleSubComponentEdit();}}>
                                <EditIcon />
                            </IconButton>                    
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={()=>{handleSubComponentDeletion();}}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                ) : 
                ( <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={()=>{handleSubComponentDeletion();}}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>    
                )
            ) : (<div></div>)}
        </Toolbar>
      );
}

/**
 * Properties for the SubComponentTable 
 */
export interface SubComponentTableProps {
    subcomponents: ISubcomponent[];
    handleCreateSubComponent: () => void;
    handleEditSubComponent: (subcomponent: ISubcomponent) => void;
    handleDeleteSubComponents: (subcomponents: ISubcomponent[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

/**
 * Table for the subcomponents
 * 
 * @param props SubComponentTableProps
 * @returns Table
 */
export function SubComponentTable(props: SubComponentTableProps) {

    const {subcomponents, handleCreateSubComponent, handleDeleteSubComponents, handleEditSubComponent} = props;


    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ISubcomponent>('name');
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ISubcomponent) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = subcomponents.map((n) => n.id);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
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

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, subcomponents.length - page * rowsPerPage);

    const handleSubComponentDeletion = () => {
        const subcomponentsToDelete :ISubcomponent[] = subcomponents.filter(subcomponent => isSelected(subcomponent.name)).slice();
        handleDeleteSubComponents(subcomponentsToDelete);
    };

    const handleSubComponentEdit = () => {
            if(selected.length === 1){
                //TODO: SELECTION WORKS WITH THE NAME OF A SUBCOMPONENT - THERE MIGHT BE DUPLICATES
                const subComponentIndex = subcomponents.findIndex(subcomponent => isSelected(subcomponent.name));
                console.log("Selected subcomponent to edit:", subcomponents[subComponentIndex]);
                handleEditSubComponent(subcomponents[subComponentIndex]);
            }
    };

    const handleSubComponentCreation = () => {
        handleCreateSubComponent();
    };

    return(  <div className={classes.root}>
        <Paper className={classes.paper}>
          <SubComponentTableToolbar 
            numSelected={selected.length} 
            handleSubComponentDeletion={handleSubComponentDeletion} 
            handleSubComponentEdit={handleSubComponentEdit}
            handleSubComponentCreation={handleSubComponentCreation}/>
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
                rowCount={subcomponents.length}
              />
              <TableBody>
                {stableSort<ISubcomponent>(subcomponents, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subcomponent, index) => {
                    const isItemSelected = isSelected(subcomponent.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, (subcomponent.name as string))}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={subcomponent.name}
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
                            <ul className="component-configurator-shadowmode-list">
                                {subcomponent.shadowmodes.map((shadowmode)=> {

                                        return (
                                        <li key={shadowmode.id} className="component-configurator-shadowmode-list-item">
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
            count={subcomponents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>

      </div>
    );
}