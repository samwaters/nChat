declare class JSEncryptRSAKey {
  constructor();
}
declare class JSEncrypt {
  constructor();
  decrypt(text:string):string;
  encrypt(text:string):string;
  getPrivateKey():JSEncryptRSAKey;
  getPrivateKeyB64():string;
  getPublicKey():JSEncryptRSAKey;
  getPublicKeyB64():string;
  setKey(key:string);
  setPrivateKey(key:string);
  setPublicKey(key:string);
}
