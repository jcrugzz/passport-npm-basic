const crypto = require('crypto');

exports.createPassportOptions = function createPassportOptions(options) {
  options = options || {};
  const auth = options.auth;
  const lookup = typeof options.lookup === 'function'
    ? options.lookup
    : null;

  if (!auth && !lookup) {
    throw new Error('auth or lookup option must be passed in')
  }

  function fourOhOne() {
    const err = new Error('Invalid Login')
    err.status = 401;
    return err;
  }

  const authenticate = (data, done) => {
    const name = data.name;

    if (lookup) {
      // Handle errors or a false for whether it is authenticated
      return lookup(data, (err, res) => {
        if (err) return done(err);
        if (res) return done(null, { name })
        done(fourOhOne());
      });
    }

    if (compare(name, auth.user)
      && compare(data.password, auth.password)) return done(null, { name });

    done(fourOhOne());
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
        password
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

function compare(a, b) {
  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))
  } catch(ex) {
    return false;
  }
}
