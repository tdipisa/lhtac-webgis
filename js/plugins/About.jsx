/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const assign = require('object-assign');

const About = require('../components/About');
const {Glyphicon} = require('react-bootstrap');

module.exports = {
    AboutPlugin: assign(About, {
        Toolbar: {
            name: 'about',
            panel: true,
            wrap: true,
            exclusive: true,
            position: 9,
            icon: <Glyphicon glyph="glyphicon glyphicon-cloud"/>,
            tooltip: "about"
        }
    }),
    reducers: {}
};
