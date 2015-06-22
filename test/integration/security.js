var expect = require('expect.js');
var hoodie_server = require('../../');
var http = require('http');
var os = require('os');

var config = {
  www_port: 5001,
  admin_port: 5011,
  admin_password: '12345'
};

describe('block _all_dbs', function () {
  this.timeout(30000);

  it('should 404 on /_api/_all_dbs', function (done) {
    http.get({
      host: '127.0.0.1',
      port: config.www_port,
      method: 'get',
      path: '/_api/_all_dbs',
      agent: false
    }, function (res) {
      expect(res.statusCode).to.be(404);
      done();
    });
  });


  it('should log into admin', function (done) {
    var body = 'name=admin&password=' + config.admin_password;
    var req = http.request({
      host: '127.0.0.1',
      port: config.admin_port,
      method: 'post',
      path: '/_api/_session',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-length': body.length
      },
      agent: false
    }, function (res) {
      expect(res.statusCode).to.be(200);
      done();
    });
    req.write(body);
    req.end();
  });
});
