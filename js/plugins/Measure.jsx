/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const {Glyphicon} = require('react-bootstrap');
const {connect} = require('react-redux');

const Message = require('../../MapStore2/web/client/plugins/locale/Message');

const lineRuleIcon = require('../../MapStore2/web/client/plugins/toolbar/assets/img/line-ruler.png');

const assign = require('object-assign');

const {changeMeasurementState} = require('../../MapStore2/web/client/actions/measurement');

const Measure = require('../../MapStore2/web/client/components/mapcontrols/measure/MeasureComponent');

const MeasureComponent = React.createClass({
    render() {
        const labels = {
            lengthButtonText: <Message msgId="measureComponent.lengthButtonText"/>,
            areaButtonText: <Message msgId="measureComponent.areaButtonText"/>,
            resetButtonText: <Message msgId="measureComponent.resetButtonText"/>,
            lengthLabel: <Message msgId="measureComponent.lengthLabel"/>,
            areaLabel: <Message msgId="measureComponent.areaLabel"/>,
            bearingLabel: <Message msgId="measureComponent.bearingLabel"/>
        };
        return <Measure {...labels} {...this.props} formatBearing= {(value) => (value.toString() + '°')}/>;
    }
});

const MeasurePlugin = connect((state) => {
    return {
        measurement: state.measurement || {},
        lineMeasureEnabled: state.measurement && state.measurement.lineMeasureEnabled || false,
        areaMeasureEnabled: state.measurement && state.measurement.areaMeasureEnabled || false,
        bearingMeasureEnabled: state.measurement && state.measurement.bearingMeasureEnabled || false
    };
}, {
    toggleMeasure: changeMeasurementState
})(MeasureComponent);

module.exports = {
    MeasurePlugin: assign(MeasurePlugin, {
        Toolbar: {
            name: 'measurement',
            position: 9,
            panel: true,
            exclusive: true,
            wrap: true,
            help: <Message msgId="helptexts.measureComponent"/>,
            tooltip: "measureComponent.tooltip",
            icon: <Glyphicon glyph="1-stilo"/>,
            title: "measureComponent.title",
            priority: 1
        },
        DrawerMenu: {
            name: 'measurement',
            position: 3,
            icon: <img src={lineRuleIcon} />,
            title: 'measureComponent.title',
            showPanel: false,
            priority: 2
        }
    }),
    reducers: {measurement: require('../../MapStore2/web/client/reducers/measurement')}
};
