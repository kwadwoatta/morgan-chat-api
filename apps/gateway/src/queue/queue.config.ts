// import { BullModule } from '@nestjs/bullmq';

// export const queueConfig = BullModule.forRoot({
//   connection: {
//     host: process.env.REDIS_HOST,
//     port: Number.parseInt(process.env.REDIS_PORT),
//   },
//   defaultJobOptions: {
//     removeOnComplete: true,
//     removeOnFail: true,
//     attempts: 1,
//   },
// });
