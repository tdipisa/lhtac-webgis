/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {connect} = require('react-redux');
const assign = require('object-assign');

const {Glyphicon} = require('react-bootstrap');
const {createSelector} = require('reselect');
const lhtac = require('../selectors/lhtac');

const {bindActionCreators} = require('redux');

const {
    removeSpatialSelection,
    zoneSearch,
    zoneChange,
    resetZones
} = require('../../MapStore2/web/client/actions/queryform');

const {
    createFilterConfig,
    setBaseCqlFilter
} = require('../actions/advancedfilter');

const {
    setActiveZone,
    changeLhtacLayerFilter,
    zoneGetValues
    } = require('../actions/lhtac');

const {
    changeZoomArgs
} = require('../actions/areafilter');

const SpatialFilter = connect((state) => ({
    useMapProjection: state.queryform.useMapProjection,
    spatialField: state.queryform.spatialField,
    showDetailsPanel: state.queryform.showDetailsPanel,
    withContainer: state.queryform.withContainer,
    spatialMethodOptions: state.queryform.spatialMethodOptions,
    spatialOperations: state.queryform.spatialOperations
}), (dispatch) => {
    return {
        actions: bindActionCreators({
            onRemoveSpatialSelection: removeSpatialSelection,
            zoneFilter: zoneGetValues,
            zoneSearch,
            setActiveZone,
            zoneChange
        }, dispatch)
    };
})(require('../components/LhtacSpatialFilter'));

const {changeMapView} = require('../../MapStore2/web/client/actions/map');

const WMSCrossSelector = createSelector([
        lhtac,
        (state) => (state.queryform.spatialField),
        (state) => (state.map || {}),
        (state) => (state)
        ],
        (lhtacState, spatialField, mapConfig, state) => ({
            activeLayer: lhtacState.activeLayer,
            toolbarEnabled: true,
            spatialField,
            mapConfig,
            zoomArgs: state.areafilter.zoomArgs
        }));

const WMSCrossLayerFilter = connect( WMSCrossSelector, (dispatch) => {
    return {
        actions: bindActionCreators({
            onQuery: changeLhtacLayerFilter,
            onReset: resetZones,
            changeZoomArgs,
            changeMapView,
            createFilterConfig,
            setBaseCqlFilter
        }, dispatch)
    };
})(require('../components/WMSCrossLayerFilter'));

const AreaFilterPlugin = React.createClass({
    propTypes: {
        expanded: React.PropTypes.bool,
        pinned: React.PropTypes.bool,
        onToggle: React.PropTypes.func,
        onPin: React.PropTypes.func,
        height: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            expanded: true,
            pinned: false,
            onToggle: () => {},
            onPin: () => {},
            height: "100%"
        };
    },
    render() {
        return (
            <div id="areaFilter" className="lhtac-panel">
                <SpatialFilter/>
                <WMSCrossLayerFilter
                    filterType={"OGC"}/>
            </div>
        );
    }
});

module.exports = {
    AreaFilterPlugin: assign(AreaFilterPlugin, {
        DrawerMenu: {
            name: 'areafilter',
            position: 4,
            icon: <Glyphicon glyph="glyphicon glyphicon-filter"/>,
            title: 'areafilter',
            priority: 2
        }
    }),
    reducers: {
        areafilter: require('../reducers/areafilter')
    }
};
