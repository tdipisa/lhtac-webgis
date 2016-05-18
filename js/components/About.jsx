/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {Panel} = require('react-bootstrap');

const About = React.createClass({
    propTypes: {
        textContent: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            textContent: ""
        };
    },
    render() {
        return (
            <Panel header="About this map" id="lhtac-about-panel">
                <p key="about-panel">{this.props.textContent}</p>
            </Panel>
        );
    }
});

module.exports = About;
