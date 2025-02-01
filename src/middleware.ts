import type { APIContext, APIRoute } from 'astro';

export const onRequest = async (
  context: APIContext,
  next: () => Promise<Response>
): Promise<Response> => {
  try {
    const response = await next();
    return response;
  } catch (error) {
    console.error('Middleware Error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response('Internal Server Error', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
};
