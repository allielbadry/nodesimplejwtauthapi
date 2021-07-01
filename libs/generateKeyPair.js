const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

/**
 * This module will generate a public and private keypair and save to current directory
 *
 * Make sure to save the private key elsewhere after generated!
 */

function generateKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // "Private Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
  });

  // create the public key
  fs.writeFileSync(
    path.join(__dirname, "..", "/keys/id_rsa_pub.pem"),
    keyPair.publicKey
  );
  // create the private key
  fs.writeFileSync(
    path.join(__dirname, "..", "/keys/id_rsa_priv.pem"),
    keyPair.privateKey
  );
}

generateKeyPair();
