const assume = require('assume');
const { createPassportOptions } = require('./');

describe('createPassportOptions.test', function () {

  it('should throw an error if auth or lookup is not passed', function () {
    assume(function () {
      createPassportOptions();
    }).throws();
  });

  it('should not throw if auth object is given', function () {
    const {
      authenticate,
      deserializeNPMToken,
      serializeNPMToken
    } = createPassportOptions({ auth: { user: 'hello', password: 'there' }});

    assume(authenticate).is.a('function');
    assume(deserializeNPMToken).is.a('function');
    assume(serializeNPMToken).is.a('function');
  });

  it('should not throw if lookup function is given', function () {
    const lookup = (data, next) => {
      next();
    };
    const {
      authenticate,
      deserializeNPMToken,
      serializeNPMToken
    } = createPassportOptions({ lookup });

    assume(authenticate).is.a('function');
    assume(deserializeNPMToken).is.a('function');
    assume(serializeNPMToken).is.a('function');
  });

  it('should throw if lookup is given but is not a function', function () {
     assume(function () {
      createPassportOptions({ lookup: {} });
    }).throws();
  });
});
