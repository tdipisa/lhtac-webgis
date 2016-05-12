/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const SWITCH_LAYER = 'SWITCH_LAYER';

function switchLayer(toggle) {
    return {
        type: SWITCH_LAYER,
        toggle: toggle
    };
}

module.exports = {
    SWITCH_LAYER,
    switchLayer
};
