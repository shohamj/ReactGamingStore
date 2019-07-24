const NodeRSA = require('node-rsa');

var key;
var publicKey;

function generateKey(){
    key = new NodeRSA({b: 512});
    const publicDer = key.exportKey('public');    
    publicKey = publicDer.toString('hex');

}
function CreateKeyFromPublic(publicKeyString){
    var key = new NodeRSA(publicKeyString,'public')
    return key;
}

function Encrypt(data, key){
    return key.encrypt(data, 'base64');
}

function Decrypt(data, key){
    return key.decrypt(data, "utf-8");
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

function main(){
    
    var pub = CreateKeyFromPublic(getPublicKey());
    let t = Encrypt("doodi", pub);
    let t2 = Encrypt("doodi", pub);
    console.log(t);
    console.log(t2);
    let tt = Decrypt(t, getKey());
    let tt2 = Decrypt(t2, getKey());
    console.log(tt);
    console.log(tt2);
}
main()