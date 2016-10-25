/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {union} = require('turf');

const ZoneUtils = {
    geometryUnion: (geometries, callback, onError, result = null) => {
        if (geometries.length > 0) {
            const newResult = result === null ? geometries[0] : union(result, geometries[0]);

            setTimeout(ZoneUtils.geometryUnion.bind(null, geometries.slice(1), callback, onError, newResult), 0);
        } else {
            callback(result);
        }
    }
};

module.exports = ZoneUtils;
