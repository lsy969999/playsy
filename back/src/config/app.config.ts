import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  SERVER_PORT: 4000,
}));
