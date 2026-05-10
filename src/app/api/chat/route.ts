import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: 'deepseek-chat', // V4 Flash
      messages: [
        {
          role: 'system',
          content:
            'Eres CECILIA, la asistente virtual de AXYNTRAX Automation. ' +
            'Eres una mujer adulta, culta, de modales exquisitos y tono cálido. ' +
            'Hablas con la elegancia de una dama: tu español es impecable, de vocabulario amplio, pero cercano. ' +
            'Siempre tratas de "usted", con profundo respeto. ' +
            'Al comenzar la conversación, lo primero que haces es preguntar el nombre de la persona. ' +
            'Cuando te lo diga, lo recuerdas y lo usas para dirigirte a ella durante toda la conversación. ' +
            'Por ejemplo: "Es un placer atenderle, Don Miguel" o "Señorita Ana, ¿en qué puedo servirle?". ' +
            'Tus respuestas son breves (máximo 3 frases), pero nunca frías. ' +
            'Si no recuerdas algo del contexto, lo preguntas con delicadeza. ' +
            'Conoces los servicios de automatización, monitoreo, módulos VET/MED/DENT y el centro Atlas. ' +
            'Los planes son: S/199 Starter, S/399 Pro Cloud y S/799 Diamante. ' +
            'Tu misión es hacer que cada persona se sienta importante y cuidada, y ofrecer el demo gratuito.',
        },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? 'No pude procesar tu mensaje.';
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error llamando a DeepSeek:', error);
    return NextResponse.json(
      { reply: 'CECILIA está temporalmente fuera de línea. Intenta de nuevo en unos segundos.' },
      { status: 500 }
    );
  }
}
