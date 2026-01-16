import { Injectable } from '@nestjs/common';

@Injectable()
export class AiMockService {
  generateReply(input: string): string {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return 'Our pricing starts at $99/month. Would you like a demo?';
    }
    if (lowerInput.includes('demo')) {
      return 'I can schedule a demo for you tomorrow. What time works best?';
    }
    return 'Thanks for your message! A specialist will reach out shortly.';
  }
}
