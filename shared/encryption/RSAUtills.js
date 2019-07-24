import NodeRSA from 'node-rsa';

function CreateKeyFromPublic(publicKeyString){
    console.log("CreateKeyFromPublic " + publicKeyString);
    var key = new NodeRSA(publicKeyString,'public')
    return key;
}

function Encrypt(data, key){
    console.log(key.exportKey('public'));
    return key.encrypt(data, 'base64');
}

function Decrypt(data, key){
    return key.decrypt(data, 'utf-8');
}

export {CreateKeyFromPublic, Encrypt, Decrypt};
