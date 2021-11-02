const methods = ['POST', 'PUT', 'PATCH'];

const parseBody = async (req) => {
  if (!methods.includes(req.method)) return null;

  return new Promise((resolve, reject) => {
    if (req.method['content-type'] !== 'application/json'){
      reject('Incorrect content-type');
      return;
    }

    let data = '';

    req.on('data', (chunk) => {

      data += chunk;
    });

    req.on('end', async() => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject('bad JSON');   
      }
    });
  });



};

module.exports = parseBody;
