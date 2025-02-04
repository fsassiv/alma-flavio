import { handleRequest } from '@/lib/utils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const {
    firstName,
    lastName,
    email,
    countryOfCitizenship,
    visaInterest,
    message,
  } = await req.json();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, data] = await handleRequest(
    prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        countryOfCitizenship,
        visaInterest,
        message,
      },
    })
  );

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
