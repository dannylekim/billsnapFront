import { login, register } from './UserRequests'
import sinonStubPromise from 'sinon-stub-promise';
import sinon from 'sinon'

// import 'whatwg-fetch'
// const loginInput = {

// };

const loginResponse = {
    
};


sinonStubPromise(sinon)

describe('UserRequests', () => {
    describe('login', () => {
        it('Should login successfully', () => {
            let stubedFetch = sinon.stub(window, 'fetch')
            window.fetch.returns(mockApiResponse());
        });
    });
});

function mockApiResponse(body) {
    return new window.Response(JSON.stringify(body), {
       status: 200,
       headers: { 'Content-type': 'application/json' }
    });
}