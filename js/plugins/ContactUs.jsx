/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const assign = require('object-assign');

const ContactUs = require('../components/ContactUs');
const {Glyphicon} = require('react-bootstrap');

module.exports = {
    ContactUsPlugin: assign(ContactUs, {
        Toolbar: {
            name: 'contactus',
            panel: true,
            wrap: true,
            exclusive: true,
            position: 10,
            icon: <Glyphicon glyph="glyphicon glyphicon-envelope"/>,
            tooltip: "contactus"
        }
    }),
    reducers: {}
};
