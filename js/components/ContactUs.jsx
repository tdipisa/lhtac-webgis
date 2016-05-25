/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {Panel} = require('react-bootstrap');

const ContactUs = React.createClass({
    propTypes: {
        textContent: React.PropTypes.array
    },
    getDefaultProps() {
        return {
            textContent: []
        };
    },
    render() {
        return (
            <Panel header="Contact Us" id="lhtac-contactus-panel">
                {this.props.textContent.map((paragraph) => <p key={paragraph.id}>{paragraph.text}</p>)}
            </Panel>
        );
    }
});

module.exports = ContactUs;
