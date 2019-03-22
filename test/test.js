import test from 'ava';
const request = require('supertest');
const user = require('../routes/user');
const app = require('../app');


test('bar', async t => {
    const bar = Promise.resolve('bar');
    t.is(await bar, 'bar');
});


test('check status', async t => {
    const response = await request(app)
      .get('/status');
      t.is(response.status, 200);
      t.deepEqual(response.body, {
        status : 'Ok'
      });
  })
  
test('login:Success', async t => {
	t.plan(2);

	const res = await request(user)
		.post('/user/login')
		.send({email: 'zohaibjawaid92@yahoo.com', password: '123123'});

	t.is(res.status, 200);
	t.is(res.body.email, 'zohaibjawaid92@yahoo.com');
});