import Vapi from '@vapi-ai/web';

const VAPI_WEB_TOKEN = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '';

export const vapi = new Vapi(VAPI_WEB_TOKEN);