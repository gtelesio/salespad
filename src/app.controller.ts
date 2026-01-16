import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  @Get()
  getHello() {
    return {
      data: {
        name: 'Salespad API',
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        docs: '/api/docs',
        time: new Date().toISOString(),
      },
      links: {
        self: '/',
        health: '/api/v1/health',
        docs: '/api/docs',
        v1: '/api/v1',
        leads: '/api/v1/leads',
      },
    };
  }
}
