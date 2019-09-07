import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'

const web3Obj = {
    web3: new Web3(),
    torus: '',
    setweb3: function (provider) {
        const web3Inst = new Web3(provider);
        web3Obj.web3 = web3Inst;
        sessionStorage.setItem('pageUsingTorus', true)
    },
    initialize: async function () {
        let torus = new Torus();
        await torus.init('testing');
        await torus.login();
        if (torus.provider.networkVersion !== '4') {
            await torus.setProvider('rinkeby');
        }
        web3Obj.setweb3(torus.provider);
        web3Obj.torus = torus
    },
    fetchAddressUsingEmail: async function (email) {
        let torus = web3Obj.torus;
        let address = await torus.getPublicAddress(email);
        return address;
    },
    logout: async function () {
        let torus = web3Obj.torus;
        await torus.logout();
    },
};
export default web3Obj
