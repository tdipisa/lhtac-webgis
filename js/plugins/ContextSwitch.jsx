/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {connect} = require('react-redux');
const assign = require('object-assign');

const {switchLayer} = require('../actions/lhtac');
const {changeLayerProperties} = require('../../MapStore2/web/client/actions/layers');

const ContextSwitch = connect((state) => ({
    contextLayers: state.lhtac.contextLayers,
    activeLayer: state.lhtac.activeLayer
}), {
    switchLayer,
    changeLayerProperties
})(require('../components/ContextSwitch'));

module.exports = {
    ContextSwitchPlugin: assign(ContextSwitch, {
        Settings: {
            tool: <ContextSwitch key="contextswitch"/>,
            position: 4
        }
    }),
    reducers: {}
};
