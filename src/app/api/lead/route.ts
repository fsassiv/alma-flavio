import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    if (!req.body) {
      return new Response(JSON.stringify({ error: 'Missing request body' }), {
        status: 400,
      });
    }

    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid or empty request body' }),
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      countryOfCitizenship,
      visaInterest,
      message,
      personalUrl,
    } = body;

    const data = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        countryOfCitizenship,
        visaInterest,
        message,
        personalUrl,
      },
    });

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error('Prisma error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save lead' }), {
      status: 500,
    });
  }
}

export async function GET() {
  const leads = await prisma.lead.findMany();

  return new Response(JSON.stringify(leads), {
    status: 200,
  });
}
