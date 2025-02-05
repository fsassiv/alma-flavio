'use client';
import { MessageSquareWarning } from 'lucide-react';
import { useState } from 'react';
import { LeadErrorDialog } from '../lead-error-dialog';
import { LeadForm } from '../lead-form';
import { LeadSuccessDialog } from '../lead-success-dialog';

export const LeadFormWrapper = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  return (
    <div className="container mx-auto text-center p-10 lg:py-20 lg:px-80">
      <MessageSquareWarning className="mx-auto text-purple-500 w-[60px] h-[60px] mb-4" />
      <h4 className="font-bold text-xl mb-4">
        Want to understand your Visa options?
      </h4>
      <h5 className="font-bold text-lg">
        Submit the form below and our team of experienced attorneys will review
        your information and send a preliminary assessment of your case based on
        your goals
      </h5>
      <LeadForm
        handleSubmitSuccess={() => setOpenSuccess(true)}
        handleSubmitError={() => setOpenError(true)}
      />
      <LeadSuccessDialog open={openSuccess} />
      <LeadErrorDialog
        open={openError}
        closeDialog={() => setOpenError(false)}
      />
    </div>
  );
};
