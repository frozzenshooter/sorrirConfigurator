import IShadowmode from "../../../models/IShadowmode";
import ISubcomponent from "../../../models/ISubcomponent";
import Order from "./Order";

/**
 * Compares two objects by a the value of a key
 * 
 * @param a first object of Type T
 * @param b second object of Type T
 * @param orderBy the key to ccompare the elements
 * @returns number with the descending order 
 */
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
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
export function getComparator<Key extends keyof ISubcomponent>( order: Order, orderBy: Key)
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
export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}