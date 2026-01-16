import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/app.controller';


describe('AppController', () => {
  let appController: AppController;
  const originalEnv = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...originalEnv };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('root', () => {
    it('should return welcome message with development env by default', () => {
      delete process.env.NODE_ENV;
      const result = appController.getHello();
      expect(result.data.environment).toBe('development');
    });

    it('should return defined environment', () => {
      process.env.NODE_ENV = 'production';
      const result = appController.getHello();
      expect(result.data.environment).toBe('production');
    });

    it('should match structure', () => {
      const result = appController.getHello();
      expect(result).toMatchObject({
        data: {
          name: 'Salespad API',
          version: '1.0.0',
        },
        links: {
          self: '/',
        },
      });
      expect(result.data.time).toBeDefined();
    });
  });
});
