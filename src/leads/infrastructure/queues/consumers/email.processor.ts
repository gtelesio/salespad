import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import type { EmailJobData } from '../../../application/interfaces/email-job.interface';

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  async process(job: Job<EmailJobData, any, string>): Promise<void> {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
    this.logger.debug(`Sending email to ${job.data.email} with content: ${job.data.message}`);

    // Simulate sending time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate random failure for retry demonstration (10% chance)
    if (Math.random() < 0.1) {
      this.logger.error('Failed to send email (Simulated)');
      throw new Error('Random failure for retry testing');
    }

    this.logger.log(`Email sent successfully to ${job.data.email}`);
  }
}
