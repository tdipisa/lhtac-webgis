/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {
    SWITCH_LAYER
} = require('../actions/lhtac');

const assign = require('object-assign');

const initialState = {};

function lhtac(state = initialState, action) {
    switch (action.type) {
        case SWITCH_LAYER: {
            return assign({}, state, {});
        }
        default:
            return state;
    }
}

module.exports = lhtac;
