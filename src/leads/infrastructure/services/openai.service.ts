import { Injectable, Logger } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiService {
  private readonly logger = new Logger(OpenAiService.name);
  private readonly apiKey: string;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY') || '';
    this.model = this.configService.get<string>('OPENAI_MODEL') || 'gpt-4';
  }

  async generateReply(input: string): Promise<string> {
    if (!this.apiKey) {
      this.logger.warn('OPENAI_API_KEY not found. Using mock fallback.');
      return this.mockFallback(input);
    }

    try {
      this.logger.log(`Calling OpenAI API (${this.model})...`);
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful sales assistant. Keep your replies concise and professional.',
            },
            { role: 'user', content: input },
          ],
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Invalid response format from OpenAI');
      }

      return content.trim();
    } catch (error) {
      this.logger.error('Failed to generate AI reply', error.stack);
      return this.mockFallback(input);
    }
  }

  private mockFallback(input: string): string {
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
