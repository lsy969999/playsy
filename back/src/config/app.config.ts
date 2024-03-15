import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  SERVER_PORT: process.env.SERVER_PORT || 4000,
}));
