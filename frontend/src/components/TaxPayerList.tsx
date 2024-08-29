import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DataTable, { TableColumn } from 'react-data-table-component';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface TaxPayerListProps {
  taxPayers: TaxPayer[];
}

const columns: TableColumn<TaxPayer>[] = [
  {
    name: 'TID',
    selector: row => row.tid,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: row => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lastName,
    sortable: true,
  },
  {
    name: 'Address',
    selector: row => row.address,
    sortable: true,
    grow: 2,
  },
];

const TaxPayerList: React.FC<TaxPayerListProps> = ({ taxPayers }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        TaxPayer Records
      </Typography>
      <DataTable
        columns={columns}
        data={taxPayers}
        pagination
        responsive
        highlightOnHover
        striped
      />
    </>
  );
};

export default TaxPayerList;
