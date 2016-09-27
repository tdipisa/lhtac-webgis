/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {
    RESIZE_HEIGHT,
    CHANGE_ZOOM_ARGS
} = require('../actions/areafilter');

const assign = require('object-assign');

const initialState = {
    expanded: true,
    pinned: true,
    layoutUpdates: {
        resize: 0,
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%"
        }
    }
};

function areafilter(state = initialState, action) {
    switch (action.type) {
        case RESIZE_HEIGHT: {
            let newStyle = {...state.layoutUpdates.style, height: action.height};
            let newLayout = {...state.layoutUpdates, style: newStyle, resize: state.layoutUpdates.resize + 1};
            return {...state, layoutUpdates: newLayout};
        }
        case 'ZONES_RESET': {
            let newStyle = {...state.layoutUpdates.style, height: "100%"};
            let newLayout = {...state.layoutUpdates, style: newStyle, resize: state.layoutUpdates.resize + 1};
            return {...state, layoutUpdates: newLayout};
        }
        case 'BASE_CQL_FILTER': {
            let newStyle = {...state.layoutUpdates.style, height: "100%"};
            let newLayout = {...state.layoutUpdates, style: newStyle, resize: state.layoutUpdates.resize + 1};
            return {...state, layoutUpdates: newLayout};
        }
        case 'TOGGLE_FILTER': {
            let newStyle = {...state.layoutUpdates.style, height: "100%"};
            let newLayout = {...state.layoutUpdates, style: newStyle, resize: state.layoutUpdates.resize + 1};
            return {...state, layoutUpdates: newLayout};
        }
        case 'FEATURE_SELECTOR_RESET':
        {
            let newStyle = {...state.layoutUpdates.style, height: "100%"};
            let newLayout = {...state.layoutUpdates, style: newStyle, resize: state.layoutUpdates.resize + 1};
            return {...state, layoutUpdates: newLayout};
        }
        case CHANGE_ZOOM_ARGS: {
            return assign({}, state, {zoomArgs: action.zoomArgs});
        }
        default:
            return state;
    }
}

module.exports = areafilter;
