const autocannon = require('autocannon');

const instance = autocannon({
  url: 'http://localhost:4444',
  connections: 100,
  duration: 60,
  pipelining: 5,
  requests: [
    {
      method: 'GET',
      path: '/task'
    },
    {
      method: 'GET',
      path: '/task/6506ed00a9ea2ce59f8dcc03'
    },
    {
      method: 'POST',
      path: '/task/create',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test my code',
        priority: 1,
        isDone: false
      })
    },
    {
      method: 'PATCH',
      path: '/task/toogle/6506ed00a9ea2ce59f8dcc03'
    }
  ]
});

autocannon.track(instance, {
  renderProgressBar: true
});