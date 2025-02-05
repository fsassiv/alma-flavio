export type LeadType = {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  countryOfCitizenship: string;
  personalUrl: string;
  visaInterest: string;
  message: string;
  status: string;
  userCV: Buffer;
  userCVName: string;
  userCVType: string;
};

export type LeadDataTableProps<TData> = {
  data: TData[];
};
