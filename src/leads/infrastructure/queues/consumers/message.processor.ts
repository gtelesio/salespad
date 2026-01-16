import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import type { MessageJobData } from '@/leads/application/interfaces/message-job.interface';
import { Channel } from '@/leads/domain/entities/lead.entity';

@Processor('message-queue')
export class MessageProcessor extends WorkerHost {
  private readonly logger = new Logger(MessageProcessor.name);

  async process(job: Job<MessageJobData, unknown, string>): Promise<void> {
    const { contactInfo, channel, message } = job.data;
    this.logger.log(`Processing job ${job.id} for channel: ${channel}`);

    try {
      switch (channel) {
        case Channel.WHATSAPP:
          await this.sendWhatsApp(contactInfo, message);
          break;
        case Channel.LINKEDIN:
          await this.sendLinkedInDM(contactInfo, message);
          break;
        default:
          await this.sendEmail(contactInfo, message);
          break;
      }
    } catch (error) {
      this.logger.error(`Failed to send message via ${channel}`, error.stack);
      throw error;
    }
  }

  private async sendEmail(to: string, content: string) {
    this.logger.debug(`[EMAIL] Sending to ${to}: "${content}"`);
    await this.simulateNetworkDelay();
  }

  private async sendWhatsApp(phone: string, content: string) {
    this.logger.debug(`[WHATSAPP] Sending message to ${phone}: "${content}"`);
    // Mock WA API call
    await this.simulateNetworkDelay();
  }

  private async sendLinkedInDM(profileId: string, content: string) {
    this.logger.debug(`[LINKEDIN] Sending DM to ${profileId}: "${content}"`);
    // Mock LinkedIn API call
    await this.simulateNetworkDelay();
  }

  private async simulateNetworkDelay() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Simulate random failure (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Simulated network failure in channel provider');
    }
  }
}
