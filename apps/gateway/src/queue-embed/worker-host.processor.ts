import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export abstract class WorkerHostProcessor extends WorkerHost {
  protected readonly logger = new Logger(WorkerHostProcessor.name);

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    if (job) {
      const { id, name, queueName, finishedOn, returnvalue } = job;
      const completionTime = finishedOn
        ? new Date(finishedOn).toISOString()
        : '';
      this.logger.log(
        `Job id: ${id}, name: ${name} completed in queue ${queueName} on ${completionTime}. Result: ${returnvalue}`,
      );
    }
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    if (job) {
      const { id, name, progress } = job;
      this.logger.log(`Job id: ${id}, name: ${name} completes ${progress}%`);
    }
  }

  @OnWorkerEvent('error')
  onError(job: Job) {
    if (job) {
      const { id, name, queueName, failedReason } = job;
      this.logger.error(
        `Error occurred for job id: ${id}, name: ${name} in queue ${queueName}. Failed reason: ${failedReason}`,
      );
    }
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    if (job) {
      const { id, name, queueName, failedReason } = job;
      this.logger.error(
        `Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`,
      );
    }
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    if (job) {
      const { id, name, queueName, timestamp } = job;
      const startTime = timestamp ? new Date(timestamp).toISOString() : '';
      this.logger.log(
        `Job id: ${id}, name: ${name} starts in queue ${queueName} on ${startTime}.`,
      );
    }
  }

  @OnWorkerEvent('stalled')
  onStalled(job: Job) {
    if (job) {
      const { id, name, queueName } = job;
      this.logger.warn(
        `Job id: ${id}, name: ${name} has stalled in queue ${queueName}`,
      );
    }
  }

  @OnWorkerEvent('drained')
  onDrained(job: Job) {
    if (job) {
      const { id, name, queueName } = job;
      this.logger.log(
        `Job id: ${id}, name: ${name} has been drained from queue ${queueName}`,
      );
    }
  }

  @OnWorkerEvent('paused')
  onPaused(job: Job) {
    if (job) {
      const { id, name, queueName } = job;
      this.logger.log(
        `Job id: ${id}, name: ${name} has been paused in queue ${queueName}`,
      );
    }
  }

  @OnWorkerEvent('resumed')
  onResumed(job: Job) {
    if (job) {
      const { id, name, queueName } = job;
      this.logger.log(
        `Job id: ${id}, name: ${name} has been resumed in queue ${queueName}`,
      );
    }
  }
}
