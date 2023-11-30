let crypto = require('crypto');

function generateEcommSignature(data, key) {
    // Prepare variables that will be used in the algorithm
    let signature = '';
    let currentData = data;
    let dataArray = [];

    // Now we go through each property within the data sent
    for (const [key, value] of Object.entries(currentData)) {
        // The first step requires the booleans to be encoded to 1/0 instead of true/false
        if (value === true) {
            currentData[key] = 1;
        } else if (value === false) {
            currentData[key] = 0;
        }

        // Now we convert the key-value pairs into strings
        let newPair = `${key}:${value}`

        // The next step requires the new strings to be converted to UTF-8
        newPair = Buffer.from(newPair, 'utf-8').toString();
        dataArray.push(newPair);
    }

    // Now the data must be sorted using the default sort order
    dataArray.sort();
    
    // We now generate the signature from this new dataArray
    signature = dataArray.join(';'); // MUST USE SEMICOLON AS DELIMITER

    // We create an HMAC which uses an SHA-512 hash and the key
    // This is then generated as binary, and encoded as Base64
    let hash = crypto.createHmac('sha512', key);
    let updatedData = hash.update(signature, 'utf-8');
    let gen_hash = updatedData.digest('bin');
    let signatureString = Buffer.from(gen_hash).toString('base64');

    console.log(`Hash: ${signatureString}`);
    return signatureString;
}

module.exports = { generateEcommSignature };