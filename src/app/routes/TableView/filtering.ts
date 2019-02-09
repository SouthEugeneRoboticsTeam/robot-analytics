import { RowData } from '@robot-analytics/routes/TableView/data';
import { filter, forEach, includes } from 'lodash';

export const parseSearchBar = (searchBarText: string) => {
    let token: string = '';
    let first: string | number = '';
    let operator: string = '';
    let second: string | number = '';
    let result: any = {};
    let didSetTeamNumber = false;
    let inOperator = false;
    let afterOperator = false;
    let inQuotes = false;
    forEach(searchBarText, char => {
        switch (char) {
            case '"': {
                inQuotes = !inQuotes;
                if (inOperator) {
                    inOperator = false;
                    afterOperator = true;
                }
                break;
            }
            case '!':
            case '>':
            case '<':
            case '-':
            case '=':
            {
                if (inQuotes) token += char;
                else if (!afterOperator) {
                    if (!inOperator) {
                        inOperator = true;
                        first = token;
                        token = '';
                    }
                    operator += char;
                } else {
                    token += char;
                }
                break;
            }
            case ',': {
                if (inOperator) {
                    inOperator = false;
                }
                if (inQuotes) token += char;
                else {
                    if (!afterOperator) {
                        first = token;
                        token = '';
                        result['Team Number'] = ['<-', first];
                        didSetTeamNumber = true;
                    } else {
                        second = token;
                        token = '';
                        result[first] = [operator, second];
                    }
                    first = '';
                    operator = '';
                    second = '';
                    afterOperator = false;
                }
                break;
            }
            case ' ': {
                if (inOperator) {
                    inOperator = false;
                    afterOperator = true;
                }
                if (inQuotes) token += char;
                break;
            }
            default: {
                if (inOperator) {
                    inOperator = false;
                    afterOperator = true;
                }
                token += char;
            }
        }
    });
    if (!afterOperator) {
        if (!didSetTeamNumber){
            first = token;
            result['Team Number'] = ['<-', first];
        }
    } else {
        second = token;
        result[first] = [operator, second]
    }
    return result;
};

export const filterRows = (rows: Array<RowData>): Array<RowData> => {
    const filterOptions = this.parseSearchBar(this.state.searchBarText);
    return filter(rows, row => {
        let shouldFilter = false;
        forEach(filterOptions, (value, key) => {
            if (row[key] !== undefined) {
                switch (filterOptions[key][0]) {
                    case '=': {
                        shouldFilter = !(row[key] === parseFloat(filterOptions[key][1])) || shouldFilter;
                        break;
                    }
                    case '!=': {
                        shouldFilter = !(row[key] !== parseFloat(filterOptions[key][1])) || shouldFilter;
                        break;
                    }
                    case '>': {
                        shouldFilter = !(row[key] > parseFloat(filterOptions[key][1])) || shouldFilter;
                        break;
                    }
                    case '<': {
                        shouldFilter = !(row[key] < parseFloat(filterOptions[key][1])) || shouldFilter;
                        break;
                    }
                    case '>=': {
                        shouldFilter = !(row[key] >= parseFloat(filterOptions[key][1])) || shouldFilter;
                        break;
                    }
                    case '<=': {
                        shouldFilter = !(row[key] <= parseFloat(filterOptions[key][1])) || shouldFilter;
                        break;
                    }
                    case '<-': {
                        shouldFilter = !includes(`${row[key]}`, filterOptions[key][1]) || shouldFilter;
                        break;
                    }
                }
            }
        });
        return !shouldFilter;
    })
};