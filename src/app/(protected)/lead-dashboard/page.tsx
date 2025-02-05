import { LeadDataTable } from '@/app/feature/lead/components/lead-datatable';
import { SideBar } from '@/components/sidebar';
import { handleRequest } from '@/lib/utils';
import axios from 'axios';

export default async function LeadDashboard() {
  let leads = [];

  const [error, response] = await handleRequest(
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/lead`)
  );

  if (error) {
    return <div>Error</div>;
  }

  leads = response?.data?.leads;

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <SideBar />
      <div className="p-4 w-full">
        <LeadDataTable data={leads} />
      </div>
    </div>
  );
}
