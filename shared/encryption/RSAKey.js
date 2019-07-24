import NodeRSA from 'node-rsa';

var key;
var publicKey;

function generateKey(){
    key = new NodeRSA({b: 512});
    const publicDer = key.exportKey('public');    
    publicKey = publicDer.toString('hex');
}

function getKey(){
    if (typeof key !== 'undefined') {
        return key;
    }
    else{
        generateKey();
        return key;
    }
}

function getPublicKey(){
    if (typeof publicKey !== 'undefined') {
        return publicKey;
    }
    else{
        generateKey();
        return publicKey;
    }
}


export {getKey, getPublicKey};

