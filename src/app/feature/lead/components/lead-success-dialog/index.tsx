import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MessageSquareWarning } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { LeadSuccessDialogProps } from './types';

export const LeadSuccessDialog: FC<LeadSuccessDialogProps> = ({ open }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <MessageSquareWarning className="mx-auto text-purple-500 w-[60px] h-[60px] mb-4" />
            <h4 className="font-bold text-xl mb-4 text-center">Thank You!</h4>
          </AlertDialogTitle>
          <div className="text-center">
            <h5 className="font-bold text-lg">
              Your information was submitted to our team of immigration
              attorneys. Expect an email from hello@tryalma.ai.
            </h5>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex !justify-center">
          <Link href="/">
            <AlertDialogAction>Go back to Homepage</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
