/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { db } from '@boatus/db-access';
import * as express from 'express';
const app = express();
app.use(express.json())

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to boatus-backend!' });
});

app.get('/api/users', async (req, res) => {
  db.user.findMany().then((user) => {
    console.log(user)
    res.send({ message: 'Welcome to boatus-backend!', user: user });
  })
});

app.get('/api/orders', async (req, res) => {
  db.order.findMany().then((user) => {
    console.log(user)
    res.send({ message: 'Welcome to boatus-backend!', user: user });
  })
});

app.post('/api/new/user', async (req, res) => {
  db.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
  }).then(user => {
    console.log(user)
    res.send({ message: 'Welcome to boatus-backend!', user: user });
  }).catch(error => {
    res.send({ message: error.message, error: error });
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
