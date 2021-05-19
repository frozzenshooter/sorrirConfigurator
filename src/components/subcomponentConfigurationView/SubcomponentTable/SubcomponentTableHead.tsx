import ISubcomponent from "../../../models/ISubcomponent";
import Order from "./Order";
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import useStyles from "./SubcomponentTableStyles";

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
    {id: "shadowmodes", label: 'Shadowmodes'}
];

export interface SubComponentTableHeadProps {
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
 const SubComponentTableHead = (props: SubComponentTableHeadProps) => {
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

export default SubComponentTableHead;