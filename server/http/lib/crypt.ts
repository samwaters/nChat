import * as fs from 'fs';
let NodeRSA = require('node-rsa');

export enum keyType {
  CUSTOM_PRIVATE, CUSTOM_PUBLIC, PRIVATE, PUBLIC
}

export class Crypt {
  public static keys:any = {};
  private static _privateKey;
  private static _publicKey;
  public static inited:boolean = false;

  public static decrypt(text:string, key:keyType = keyType.PRIVATE, customKey:string = ''):string {
    if(Crypt.inited) {
      let decoded:string;
      switch(key) {
        case keyType.CUSTOM_PRIVATE:
          let prDecoder = new NodeRSA();
          prDecoder.importKey(customKey);
          decoded = prDecoder.decrypt(text);
          break;
        case keyType.CUSTOM_PUBLIC:
          let pubDecoder = new NodeRSA();
          pubDecoder.importKey(customKey, 'public');
          pubDecoder.setOptions({'encryptionScheme': 'pkcs1'});
          decoded = pubDecoder.decryptPublic(text);
          break;
        case keyType.PRIVATE:
          decoded = Crypt._privateKey.decrypt(text, 'base64');
          break;
        case keyType.PUBLIC:
          decoded = Crypt._publicKey.decryptPublic(text, 'base64');
          break;
        default:
          decoded = '';
      }
      return new Buffer(decoded, 'base64').toString('utf8');
    } else {
      return '';
    }
  }

  public static encrypt(text:string, key:keyType = keyType.PUBLIC, customKey:string = ''):string {
    if(Crypt.inited) {
      let encoded:string;
      switch(key) {
        case keyType.CUSTOM_PRIVATE:
          let prEncoder = new NodeRSA();
          prEncoder.importKey(customKey);
          encoded = prEncoder.encryptPrivate(text);
          break;
        case keyType.CUSTOM_PUBLIC:
          let pubEncoder = new NodeRSA();
          pubEncoder.importKey(customKey, 'public');
          pubEncoder.setOptions({'encryptionScheme': 'pkcs1'});
          encoded = pubEncoder.encrypt(text, 'base64');
          break;
        case keyType.PRIVATE:
          encoded = Crypt._privateKey.encryptPrivate(text, 'base64');
          break;
        case keyType.PUBLIC:
          encoded = Crypt._publicKey.encrypt(text, 'base64');
          break;
        default:
          encoded = '';
      }
      return encoded;
    } else {
      return '';
    }
  }

  public static init() {
    if(Crypt.inited) {
      return;
    }
    fs.readFile(__dirname + '../../../../config/keys/private.key', 'utf8', (err, data) => {
      if(!err) {
        Crypt.keys.privateKey = data;
        Crypt._privateKey = new NodeRSA(Crypt.keys.privateKey, {'encryptionScheme': 'pkcs1'});
      }
    });
    fs.readFile(__dirname + '../../../../config/keys/public.key', 'utf8', (err, data) => {
      if(!err) {
        Crypt.keys.publicKey = data;
        Crypt._publicKey = new NodeRSA(Crypt.keys.publicKey, {'encryptionScheme': 'pkcs1'});
      }
    });
    Crypt.inited = true;
  }
}
