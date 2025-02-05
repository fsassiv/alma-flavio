'use client';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
});

export const SignInForm = () => {
  const callbackUrl =
    useSearchParams()
      .get('callbackUrl')
      ?.replace(
        typeof window !== 'undefined' ? window?.location?.origin : '',
        ''
      ) || '/';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (credentials: z.infer<typeof formSchema>) => {
    await signIn('credentials', {
      username: credentials.username,
      password: credentials.password,
      redirect: true,
      callbackUrl,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
