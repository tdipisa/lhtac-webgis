/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {
    PIN_SIDEPANEL,
    TOGGLE_SIDEPANEL
} = require('../actions/sidepanel');

const assign = require('object-assign');

const initialState = {
    expanded: true,
    pinned: true,
    layoutUpdates: {
        resize: 0,
        style: {
            position: "absolute",
            top: 0,
            left: "350px",
            right: 0,
            height: "100%"
        }
    }
};

function sidepanel(state = initialState, action) {
    switch (action.type) {
        case PIN_SIDEPANEL: {
            let i = 0;
            return assign({}, state, {
                pinned: !action.pin,
                layoutUpdates: assign({}, state.layoutUpdates, {
                    resize: state.layoutUpdates.resize + 1
                })
            });
        }
        case TOGGLE_SIDEPANEL: {
            let i = 0;
            return assign({}, state, {
                expanded: !action.toggle,
                layoutUpdates: assign({}, state.layoutUpdates, {
                    resize: state.layoutUpdates.resize + 1,
                    style: !action.toggle ?
                        assign({}, state.layoutUpdates.style, {left: initialState.layoutUpdates.style.left}) :
                        assign({}, state.layoutUpdates.style, {left: 0})
                })
            });
        }
        default:
            return state;
    }
}

module.exports = sidepanel;
