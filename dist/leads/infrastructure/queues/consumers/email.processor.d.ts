import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import type { EmailJobData } from '../../../application/interfaces/email-job.interface';
export declare class EmailProcessor extends WorkerHost {
    private readonly logger;
    process(job: Job<EmailJobData, any, string>): Promise<void>;
}
