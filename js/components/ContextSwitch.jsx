/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');

const {SplitButton, MenuItem} = require('react-bootstrap');

const ContextSwitch = React.createClass({
    propTypes: {
        style: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            style: {}
        };
    },
    render() {
        return (
            <div className="switch-layer" style={this.props.style}>
                <SplitButton key="splitbutton" title="Switch Layer Context" pullRight={false}>
                  <MenuItem eventKey="1">Bridges</MenuItem>
                  <MenuItem eventKey="2">Safety</MenuItem>
                </SplitButton>
            </div>
        );
    }
});

module.exports = ContextSwitch;
