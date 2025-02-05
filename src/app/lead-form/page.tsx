import { LeadFormWrapper } from '@/app/feature/lead/components/lead-form-wrapper';
import { Hero } from '@/components/hero';

export default function LeadFormPage() {
  return (
    <div className="bg-white">
      <Hero />
      <LeadFormWrapper />
    </div>
  );
}
