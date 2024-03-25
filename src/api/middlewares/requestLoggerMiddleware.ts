import morgan from 'morgan';
import logger from '../../lib/logger';

const format = ':method :url :status :res[content-length] - :response-time ms';

const options = {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
};

export default morgan(format, options);
