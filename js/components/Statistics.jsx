/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const assign = require('object-assign');

const {Panel, ListGroup, ListGroupItem, Button} = require('react-bootstrap');

const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');

const Legend = require('../../MapStore2/web/client/components/TOC/fragments/legend/Legend');

const Statistics = React.createClass({
    propTypes: {
        layer: React.PropTypes.object,
        legend: React.PropTypes.object,
        statistics: React.PropTypes.array
    },
    getDefaultProps() {
        return {
            layer: {
                name: "lhtac:web2014all_mv",
                title: "Accidents",
                url: "{geoserverUrl}/wms?",
                type: "wms",
                style: null
            },
            legend: {
                width: 20,
                height: 20,
                options: "forceLabels:on;fontSize:14;fontName:Ariel;dx:5;fontAntiAliasing:true;fontColor:0x000033;bgColor:0xFFFFFF;dpi:75"
            },
            statistics: [
                {
                    id: 1,
                    name: "All bridges in selected area(s):",
                    value: 4204
                }, {
                    id: 2,
                    name: "Local bridges in selected area(s):",
                    value: 2375
                }, {
                    id: 3,
                    name: "Shown on map (filtered):",
                    value: 4204
                }
            ]
        };
    },
    render() {
        const layer = assign({}, this.props.layer, {url: ConfigUtils.setUrlPlaceholders({url: "{geoserverUrl}/wms?"}).url});
        return (
            <div>
                <Panel style={{height: "310px", maxHeight: "310px", overflowY: "auto"}} header="Download and statistics" eventKey="2">
                    <ListGroup className="lhtac-group-list">
                        <ListGroupItem key={1}>Selected: 0</ListGroupItem>
                        <ListGroupItem key={2}>Highlighted: 0</ListGroupItem>
                    </ListGroup>
                    <ListGroup className="lhtac-group-list">
                        {
                            this.props.statistics.map((stat) => {
                                return (
                                    <ListGroupItem key={stat.id} href="#">{stat.name + " " + stat.value}</ListGroupItem>
                                );
                            })
                        }
                    </ListGroup>
                </Panel>
                <Panel style={{marginTop: "15px"}} header={layer.title}>
                    <Legend
                        layer={layer}
                        legendHeigth={this.props.legend.height || 20}
                        legendWidth={this.props.legend.width || 20}
                        legendOptions={this.props.legend.options}/>
                </Panel>
                <Button style={{marginTop: "15px", "float": "right"}} onClick={() => {}}>
                    Clear Selections
                </Button>
            </div>
        );
    }
});

module.exports = Statistics;
