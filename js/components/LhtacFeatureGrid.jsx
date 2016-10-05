/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


const React = require('react');
const {reactCellRendererFactory} = require('ag-grid-react');
const {connect} = require('react-redux');
const {createSelector} = require('reselect');
const {isEqual} = require('lodash');
const FeatureGrid = require('../../MapStore2/web/client/components/data/featuregrid/FeatureGrid');
const {updateHighlighted } = require('../../MapStore2/web/client/actions/highlight');
const lhtac = require('../selectors/lhtac');
const BooleanCellRenderer = require('../components/BooleanCellRenderer');
const assign = require("object-assign");

const LhtacFeatureGrid = React.createClass({
    propTypes: {
        style: React.PropTypes.object,
        features: React.PropTypes.array,
        highlightedFeatures: React.PropTypes.array,
        updateHighlighted: React.PropTypes.func,
        activeLayer: React.PropTypes.object
    },
    contextTypes: {
        messages: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            style: {
                height: 0,
                width: "100%"
            },
            features: [],
            updateHighlighted: () => {}
        };
    },
    shouldComponentUpdate(nextProps) {
        return nextProps.update &&
            (
                // removed to get the grid to update more often
                /*(!this.highlighted || this.highlighted.toString() !== nextProps.highlightedFeatures.toString()) ||*/
            nextProps.style !== this.props.style || (!isEqual(nextProps.features, this.props.features)) || true);
    },
    render() {
        // Adding the cellRenderer only to the following 3 properties that are booelan fields (instead of false there is null.
        // So when the value is null it returns "false" otherwise "true")
        let newColumnsDef = this.props.activeLayer && this.props.activeLayer.columnDefs || [];
        // let fieldsToTransform = ["properties.intersection_related", "properties.impaired", "properties.lane_dep"];
        let newColumns = newColumnsDef.map((col) => {
            return (col.type !== undefined && col.type === "boolean") ?
                assign({}, col, {cellRenderer: reactCellRendererFactory(BooleanCellRenderer)}) :
                col;
        });

        return (this.props.features.length > 0) ? (
            <FeatureGrid
                style={this.props.style}
                features={this.props.features}
                selectFeatures={this.highligthFeatures}
                highlightedFeatures={this.props.highlightedFeatures}
                enableZoomToFeature={false}
                columnDefs={newColumns}
                excludeFields={this.props.activeLayer.excludeFields}
                agGridOptions={{headerHeight: 48}}
                toolbar={{zoom: false, exporter: false, toolPanel: false}}
            />
            ) : null;
    },
    highligthFeatures(features) {
        let newFeatures = features.map(f => {return f.id; });
        this.highlighted = newFeatures;
        this.props.updateHighlighted(newFeatures, 'update');
    }
});

const selector = createSelector([
    (state) => (state.featureselector.features || []),
    (state) => (state.highlight.features),
    lhtac],
    (features, highlightedFeatures, lhtacState)=> ({
        features,
        highlightedFeatures,
        activeLayer: lhtacState.activeLayer
    }));
module.exports = connect(selector, {
    updateHighlighted
})(LhtacFeatureGrid);
