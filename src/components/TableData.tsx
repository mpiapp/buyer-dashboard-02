import { Paper } from '@mui/material';
import DataTable, { TableProps } from "react-data-table-component";

function DataTableBase<T>(props: TableProps<T>): JSX.Element {

    return (
        <Paper variant="outlined" square>
            <DataTable
                pagination
                dense
                {...props}   
            />
        </Paper>
    );
}

export default DataTableBase;