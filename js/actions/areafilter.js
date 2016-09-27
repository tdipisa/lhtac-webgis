/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const RESIZE_HEIGHT = 'RESIZE_HEIGHT';
const CHANGE_ZOOM_ARGS = 'CHANGE_ZOOM_ARGS';

function changeZoomArgs(zoomArgs) {
     return {
         type: CHANGE_ZOOM_ARGS,
         zoomArgs
     };
 }

function resizeHeight(height) {
    return {
        type: RESIZE_HEIGHT,
        height
    };
}

module.exports = {
    RESIZE_HEIGHT,
    CHANGE_ZOOM_ARGS,
    resizeHeight,
    changeZoomArgs
};
