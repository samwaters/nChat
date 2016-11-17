import * as fs from 'fs';
let NodeRSA = require('node-rsa');

export class Crypt {
  public static keys:any = {};
  private static _privateKey;
  private static _publicKey;
  public static inited:boolean = false;

  public static decrypt(text:string, key:string = 'private'):string {
    if(Crypt.inited) {
      let decoded:string;
      if(key === 'private') {
        decoded = Crypt._privateKey.decrypt(text, 'base64');
      } else {
        decoded = Crypt._publicKey.decryptPublic(text, 'base64');
      }
      return new Buffer(decoded, 'base64').toString('utf8');
    } else {
      return '';
    }
  }

  public static encrypt(text:string, key:string = 'public'):string {
    if(Crypt.inited) {
      let encoded:string;
      if(key === 'private') {
        encoded = Crypt._privateKey.encryptPrivate(text, 'base64');
      } else {
        encoded = Crypt._publicKey.encrypt(text, 'base64');
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
        Crypt._publicKey = new NodeRSA(Crypt.keys.publicKey);
      }
    });
    Crypt.inited = true;
  }
}
