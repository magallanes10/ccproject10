const express = require('express');
const fs = require('fs');
const path = require('path');
const gradient = require('gradient-string');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const socketIo = require('socket.io');

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
app.use(helmet());

let requestCount = 0;
const requestsFilePath = path.join(__dirname, 'requests.json');
if (fs.existsSync(requestsFilePath)) {
  const data = fs.readFileSync(requestsFilePath, 'utf8');
  const requestObj = JSON.parse(data);
  requestCount = requestObj.count || 0;
}

app.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Request from IP: ${clientIp}, URL: ${req.originalUrl}`);
  requestCount++;
  fs.writeFile(requestsFilePath, JSON.stringify({ count: requestCount }), err => {
    if (err) {
      console.error('Error writing to requests.json:', err);
    }
  });
  io.emit('updateRequestCount', requestCount);
  next();
});

const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
  if (file.endsWith('.js')) {
    try {
      const route = require(path.join(routesPath, file));
      const routeName = path.parse(file).name;
      app.use('/api', route);
      console.log(gradient.morning(`${routeName} Successfully Deployed`));
    } catch (err) {
      const routeName = path.parse(file).name;
      console.error(gradient.instagram(`${routeName} Error while deploying: ${err.message}`));
    }
  }
});

app.get('/requests', (req, res) => {
  fs.readFile(requestsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading requests.json:', err);
      res.status(500).json({ error: 'Error reading request count' });
    } else {
      const requestObj = JSON.parse(data);
      res.json({ request: requestObj.count });
    }
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.use((err, req, res, next) => {
  console.error(gradient.instagram(`Error in route: ${err.message}`));
  res.status(500).json({ error: 'Something broke!' });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
