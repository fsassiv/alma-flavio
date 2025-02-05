'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { handleRequest } from '@/lib/utils';
import axios from 'axios';
import { Dice5, Heart } from 'lucide-react';
import { FC } from 'react';
import { LeadFormProps } from './types';
import { COUNTRIES, VISA_INTERESTS } from './utils';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  countryOfCitizenship: z.string().min(2, {
    message: 'Select a Country of citizenship',
  }),
  personalUrl: z.string().url({
    message: 'Please enter a valid url address.',
  }),
  userCV: z.instanceof(File).refine(
    (file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      return ['pdf', 'doc', 'docx'].includes(ext || '');
    },
    { message: 'Only PDF, DOC, or DOCX files are allowed' }
  ),
  visaInterest: z
    .array(z.string())
    .min(1, { message: 'Please select at least one visa interest.' }),
  message: z.string().min(2, { message: 'Please discribe your case and' }),
});

export const LeadForm: FC<LeadFormProps> = ({
  handleSubmitSuccess,
  handleSubmitError,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const onSubmit = async (lead: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append('userCV', lead.userCV);
    formData.append('visaInterest', lead.visaInterest.join(', '));
    formData.append('firstName', lead.firstName);
    formData.append('lastName', lead.lastName);
    formData.append('email', lead.email);
    formData.append('countryOfCitizenship', lead.countryOfCitizenship);
    formData.append('personalUrl', lead.personalUrl);
    formData.append('message', lead.message);

    const [error, response] = await handleRequest(
      axios.post('/api/lead', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    );

    if (error) {
      handleSubmitError();
    }

    if (!error && response?.status === 201) {
      handleSubmitSuccess();
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto max-w-[90vw] w-[400px] mt-10 mb-20"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryOfCitizenship"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Country of Citizenship" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personalUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="LinkedIn/ Personal URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          name="userCV"
          control={form.control}
          defaultValue={undefined}
          render={({ field: { onChange, ref } }) => (
            <Input
              type="file"
              accept=".pdf, .doc, .docx"
              ref={ref}
              onChange={(e) => {
                // Ensure we're sending the File object to the form
                if (e.target.files && e.target.files.length > 0) {
                  onChange(e.target.files[0]);
                }
              }}
            />
          )}
        />
        <Dice5 className="mx-auto text-purple-500 w-[60px] h-[60px] mb-1" />
        <h5 className="font-bold text-lg !mt-1">
          Visa categories of interest?
        </h5>
        <FormField
          control={form.control}
          name="visaInterest"
          render={() => (
            <FormItem>
              {VISA_INTERESTS.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="visaInterest"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id) || false}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field.value || []),
                                    item.id,
                                  ])
                                : field.onChange(
                                    (field.value || []).filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Heart className="mx-auto text-purple-500 w-[60px] h-[60px] mb-1" />
        <h5 className="font-bold text-lg !mt-1">How can we help you?</h5>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
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
