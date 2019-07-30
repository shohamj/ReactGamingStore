const NodeRSA = require('node-rsa');
var pbkdf2 = require('pbkdf2')

var challenge_response = function (hash, challenge) {
    return new Promise(function(resolve, reject) {
        pbkdf2.pbkdf2(hash, challenge, 25000, 512, 'sha256', function (err, res) 
        {
            resolve(res.toString('hex'));
            reject(err);
        })
    })
}
  
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
    challenge_response("undefined", "aaa").then(a => console.log(a)).catch(err => console.log("ERROR:", err))
    // var pub = CreateKeyFromPublic(getPublicKey());
    // let t = Encrypt("doodi", pub);
    // let t2 = Encrypt("doodi", pub);
    // console.log(t);
    // console.log(t2);
    // let tt = Decrypt(t, getKey());
    // let tt2 = Decrypt(t2, getKey());
    // console.log(tt);
    // console.log(tt2);
}
main()