/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var expect = require('expect');
var ZoneUtils = require('../ZoneUtils');
const {union} = require('turf');

var poly1 = {
  "type": "Feature",
  "properties": {
    "fill": "#0f0"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-82.574787, 35.594087],
      [-82.574787, 35.615581],
      [-82.545261, 35.615581],
      [-82.545261, 35.594087],
      [-82.574787, 35.594087]
    ]]
  }
};
var poly2 = {
  "type": "Feature",
  "properties": {
    "fill": "#00f"
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-82.560024, 35.585153],
      [-82.560024, 35.602602],
      [-82.52964, 35.602602],
      [-82.52964, 35.585153],
      [-82.560024, 35.585153]
    ]]
  }
};
var polygons = [poly1, poly2];

var myPolygons = union(poly1, poly2);

describe('Test union', () => {
    describe('Test union', () => {
        it('does union', (done) => {
            ZoneUtils.geometryUnion(polygons, (result) => {
                expect(result).toEqual(myPolygons);
                done();
            }, null, poly1);
        });
    });
});
