import Fastify from 'fastify';
import navigateAvailability from './navigateAvailability';
import { schedule } from 'node-cron';

const fastify = Fastify({
  logger: true,
});

// const cronMins = 10;
// schedule(`*/${cronMins} * * * *`, navigateAvailability);
// console.info(`Cron job started running: every ${cronMins} minutes`);

schedule('*/5 * * * * *', () => {
  console.log('Running cron job');
  navigateAvailability();
});

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log('Fastify app now running');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();