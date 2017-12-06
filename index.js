
exports.createPassportOptions = function createPassportOptions(options) {
  const auth = options.auth || {};

  const authenticate = (data, done) => {
    const name = data.name;
    if (name === auth.user
      && data.password === auth.password) return done(null, { name });

    const err = new Error('Invalid Login')
    err.status = 401;
    done(err);
  };

  const serializeNPMToken = (data, done) => {
    const name = data.name;
    const password = data.password;
      try {
        const token = JSON.stringify({
          name,
          password
        });
        done(null, token);
      }
      catch (stringifyError) {
        done(stringifyError);
      }
  };

  const deserializeNPMToken = (data, done) => {
    try {
      const req = data.req;
      const tokenData = JSON.parse(data.token);
      const name = tokenData.name;
      const password = tokenData.password;
      authenticate({
        req,
        name,
        password: password
      }, done);
    }
    catch (deserializeError) {
      done(deserializeError);
    }
  };

  return {
    authenticate,
    serializeNPMToken,
    deserializeNPMToken
  };
};
