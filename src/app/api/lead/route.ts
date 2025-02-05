import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const firstName = formData.get('firstName')?.toString();
    const lastName = formData.get('lastName')?.toString();
    const email = formData.get('email')?.toString();
    const countryOfCitizenship = formData
      .get('countryOfCitizenship')
      ?.toString();
    const visaInterest = formData.get('visaInterest')?.toString();
    const message = formData.get('message')?.toString();
    const personalUrl = formData.get('personalUrl')?.toString();
    const userCV = formData.get('userCV') as File;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !countryOfCitizenship ||
      !visaInterest ||
      !message ||
      !personalUrl ||
      !userCV
    ) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
        }
      );
    }

    const userCVBuffer = await userCV.arrayBuffer();

    const data = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        countryOfCitizenship,
        visaInterest,
        message,
        personalUrl,
        userCVName: userCV.name,
        userCVType: userCV.type,
        userCV: Buffer.from(userCVBuffer),
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
