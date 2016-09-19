/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const assign = require('object-assign');
const {connect} = require('react-redux');
const {createSelector} = require('reselect');

const {Glyphicon} = require('react-bootstrap');

const lhtac = require('../selectors/lhtac');

const {
    highlightStatus
} = require('../../MapStore2/web/client/actions/highlight');

const {featureSelectorReset} = require("../actions/featureselector");
const {changeDownloadFormat, getNumberOfFeatures, downloadSelectedFeatures} = require("../actions/lhtac");

const statisticsSelector = createSelector([
     lhtac,
     (state) => (state.featureselector),
     (state) => (state.highlight.features),
     (state) => (state.stats || {})],
     (lhtacState, selectedfeatures, highlightedfeatures, stats) => ({
         activeLayer: lhtacState.activeLayer,
         selectedfeatures,
         highlightedfeatures,
         ...stats
     }));

const Statistics = connect(statisticsSelector, {
     highlightStatus,
     featureSelectorReset,
     changeDownloadFormat,
     getNumberOfFeatures,
     downloadSelectedFeatures
 })(require("../components/Statistics"));

module.exports = {
    StatisticsPlugin: assign(Statistics, {
        DrawerMenu: {
            name: 'statistics',
            position: 6,
            icon: <Glyphicon glyph="glyphicon glyphicon-stats"/>,
            title: 'statistics',
            priority: 2
        }
    }),
    reducers: {}
};
