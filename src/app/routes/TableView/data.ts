export interface Row {
    [columnName: string]: string | number
}

export interface Column {
    name: string,
    numeric: boolean,
    disablePadding: boolean
}
