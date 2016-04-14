/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const DebugUtils = require('../../MapStore2/web/client/utils/DebugUtils');
const {combineReducers} = require('redux');

const {mapConfigHistory, createHistory} = require('../../MapStore2/web/client/utils/MapHistoryUtils');

const mapConfig = require('../../MapStore2/web/client/reducers/config');
const layers = require('../../MapStore2/web/client/reducers/layers');
const map = mapConfigHistory(require('../../MapStore2/web/client/reducers/map'));

const LayersUtils = require('../../MapStore2/web/client/utils/LayersUtils');

const allReducers = combineReducers({
    browser: require('../../MapStore2/web/client/reducers/browser'),
    locale: require('../../MapStore2/web/client/reducers/locale'),
    map: () => {return null; },
    layers: () => {return null; },
    controls: require('../../MapStore2/web/client/reducers/controls'),
    locate: require('../../MapStore2/web/client/reducers/locate'),
    mapInfo: require('../../MapStore2/web/client/reducers/mapInfo'),
    measurement: require('../../MapStore2/web/client/reducers/measurement'),
    snapshot: require('../../MapStore2/web/client/reducers/snapshot'),
    print: require('../../MapStore2/web/client/reducers/print')
});

const rootReducer = (state = null, action) => {
    let mapState = createHistory(LayersUtils.splitMapAndLayers(mapConfig(state, action)));

    const newState = {
        ...allReducers(state, action),
        map: mapState && mapState.map ? map(mapState.map, action) : null,
        layers: mapState ? layers(mapState.layers, action) : null
    };

    return newState;
};

const store = DebugUtils.createDebugStore(rootReducer, {});

module.exports = store;
