/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ON_RESET_THIS_ZONE = 'ON_RESET_THIS_ZONE';


function onResetThisZone(zoneId, reload) {
    return {
        type: ON_RESET_THIS_ZONE,
        zoneId,
        reload
    };
}

module.exports = {
    ON_RESET_THIS_ZONE,
    onResetThisZone
};
