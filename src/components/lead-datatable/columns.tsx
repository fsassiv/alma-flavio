'use client';

import { handleRequest } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { Button } from '../ui/button';
import { LeadType } from './types';
import { capitalize } from './utils';

const handleStatusUpdate = async (id: number) => {
  await handleRequest(
    axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/lead/`, { id })
  );
};

export const leadColumns: ColumnDef<LeadType>[] = [
  { accessorKey: 'id' },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) =>
      row.getValue('firstName') + ' ' + row.getValue('lastName'),
  },
  {
    accessorKey: 'createdAt',
    header: 'Submitted At',
    cell: ({ row }) => new Date(row.getValue('createdAt')).toLocaleDateString(),
  },
  {
    accessorKey: 'lastName',
  },
  {
    accessorKey: 'countryOfCitizenship',
    header: 'Country of Citizenship',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      capitalize((row.getValue('status') as string).toString()),
  },
  {
    id: 'actions',
    header: 'Update Status',
    cell: ({ row }) => {
      if (row.getValue('status') === 'REACHED_OUT') return null;
      return (
        <Button onClick={() => handleStatusUpdate(row.getValue('id'))}>
          Update
        </Button>
      );
    },
  },
];
