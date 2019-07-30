import pbkdf2 from 'pbkdf2';

var pbkdf2_sha256_promise = function (hash, challenge) {
  return new Promise(function(resolve, reject) {
      pbkdf2.pbkdf2(hash, challenge, 25000, 512, 'sha256', function (err, res) 
      {
          resolve(res.toString('hex'));
          reject(err);
      })
  })
}
export default pbkdf2_sha256_promise;