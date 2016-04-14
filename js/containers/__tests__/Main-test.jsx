/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const ReactDOM = require('react-dom');

const Main = require('../Main');

const expect = require('expect');
const store = {
    getState: () => ({}),
    subscribe: () => {}
};
describe('Main', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });

    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('creates the Main container', () => {
        const main = ReactDOM.render(<Main store={store}/>, document.getElementById("container"));
        expect(main).toExist();
    });
});
