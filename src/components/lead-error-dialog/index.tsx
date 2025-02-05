import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MessageSquareWarning } from 'lucide-react';
import { FC } from 'react';
import { LeadErrorDialogProps } from './types';

export const LeadErrorDialog: FC<LeadErrorDialogProps> = ({
  open,
  closeDialog,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <MessageSquareWarning className="mx-auto text-purple-500 w-[60px] h-[60px] mb-4" />
            <h4 className="font-bold text-xl mb-4 text-center">Ooops!</h4>
          </AlertDialogTitle>
          <div className="text-center">
            <h5 className="font-bold text-lg">
              Something went wrong. <br /> Please the information try again
              later.
            </h5>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex !justify-center">
          <AlertDialogAction onClick={() => closeDialog}>
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
