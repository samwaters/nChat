import {ActionReducer, Action} from '@ngrx/store';
export const settingsActionTypes = {
  GENERATE_CLIENT_KEYPAIR: 'GENERATE_CLIENT_KEYPAIR',
  REQUEST_SERVER_PUBLICKEY: 'REQUEST_SERVER_PUBLICKEY',
  STORE_CLIENT_KEYPAIR: 'STORE_CLIENT_KEYPAIR',
  STORE_SERVER_PUBLICKEY: 'STORE_SERVER_PUBLICKEY'
};

const initialState = {
  keys: {
    clientKeySize: 1024,
    client: {privateKey:'', publicKey:''},
    server: {privateKey:'', publicKey:''}
  }
};

interface ISettingsActions {
  generateClientKeyPair:Function;
  requestServerPublicKey:Function;
  storeClientKeyPair:Function;
  storeServerPublicKey:Function;
}

export const settingsActions:ISettingsActions = {
  generateClientKeyPair: (size:number) => {
    return {
      type: settingsActionTypes.GENERATE_CLIENT_KEYPAIR,
      payload: size
    }
  },
  requestServerPublicKey: () => {
    return {
      type: settingsActionTypes.REQUEST_SERVER_PUBLICKEY
    }
  },
  storeClientKeyPair: (privateKey:string, publicKey:string, size:number) => {
    return {
      type: settingsActionTypes.STORE_CLIENT_KEYPAIR,
      payload: {
        keySize: size,
        privateKey: privateKey,
        publicKey: publicKey
      }
    };
  },
  storeServerPublicKey: (key:string):Action => {
    return {
      type: settingsActionTypes.STORE_SERVER_PUBLICKEY,
      payload: key
    };
  }
};

export const settingsReducer:ActionReducer<any> = (state:any = initialState, action:Action) => {
  let mutatedState = Object.assign({}, state);
  switch(action.type) {
    case settingsActionTypes.STORE_CLIENT_KEYPAIR:
      mutatedState.keys.clientKeySize = action.payload.keySize;
      mutatedState.keys.client = {
        privateKey: action.payload.privateKey,
        publicKey: action.payload.publicKey
      };
      return mutatedState;
    case settingsActionTypes.STORE_SERVER_PUBLICKEY:
      mutatedState.keys.server.publicKey = action.payload;
      return mutatedState;
    default:
      return state;
  }
};


