import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FC } from 'react';
import { LeadTableFilterProps } from './types';

export const LeadTableFilter: FC<LeadTableFilterProps> = ({ table }) => {
  return (
    <div className="flex space-x-4">
      <Input
        placeholder="Filter country..."
        value={
          (table
            .getColumn('countryOfCitizenship')
            ?.getFilterValue() as string) ?? ''
        }
        onChange={(event) =>
          table
            .getColumn('countryOfCitizenship')
            ?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Select
        onValueChange={(value) => {
          table
            .getColumn('status')
            ?.setFilterValue(value === 'all' ? undefined : value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="REACHED_OUT">Reached out</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
