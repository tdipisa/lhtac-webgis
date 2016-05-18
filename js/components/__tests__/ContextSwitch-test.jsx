/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const expect = require('expect');
const React = require('react/addons');
const ReactDOM = require('react-dom');

const ContextSwitch = require('../ContextSwitch');

describe('ContextSwitch', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });

    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('create a ContextSwitch component', () => {
        const contextSwitch = ReactDOM.render(<ContextSwitch/>, document.getElementById("container"));
        expect(contextSwitch).toExist();
    });
});