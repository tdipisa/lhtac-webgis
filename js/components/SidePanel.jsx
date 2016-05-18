/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');

const {Glyphicon, Accordion, Panel} = require('react-bootstrap');

const Statistics = require("./Statistics");

const SidePanel = React.createClass({
    propTypes: {
        expanded: React.PropTypes.bool,
        pinned: React.PropTypes.bool,
        activeLayer: React.PropTypes.object,
        onToggle: React.PropTypes.func,
        onPin: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            expanded: true,
            pinned: false,
            activeLayer: {},
            onToggle: () => {},
            onPin: () => {}
        };
    },
    render() {
        let panelStyle = {
            transform: this.props.expanded ? "translate3d(0, 0, 0)" : "translate3d(-100%, 0, 0)",
            transition: "all 0.5s",
            bottom: "0"
        };

        let pinStyle = {
            transform: "rotate(" + (this.props.pinned ? "-45" : "0") + "deg)"
        };

        const accordionInstance = (
          <Accordion style={{marginTop: "5px", marginBottom: "0px"}} defaultActiveKey="3">
            <Panel className="accordion-panel" header="Select and customize an area filter" eventKey="1">
                <span/>
            </Panel>
            <Panel className="accordion-panel" header="Advanced Filter" eventKey="2">
                <span/>
            </Panel>
            <Panel className="accordion-panel" header="Statistics" eventKey="3">
                <Statistics
                    activeLayer={this.props.activeLayer}/>
            </Panel>
          </Accordion>
        );

        return (
            <div onMouseLeave={() => {
                let t = !this.props.pinned && this.props.expanded;
                if (t) { this.timeOut = setTimeout(this.toggle, 1500); }
            }} onMouseOver={() => {
                if (this.timeOut) { clearTimeout(this.timeOut); this.timeOut = null; }
            }}>
                <div id="lhac-sidepanel" style={panelStyle}>
                    <div className="header">
                        <span className="close" onClick={this.toggle}>×</span>
                        <span className="pin" style={pinStyle} onClick={this.pin}><Glyphicon glyph="pushpin"/></span>
                    </div>
                    <div className="body">
                        <div style={{overflowY: "auto"}}>
                            {accordionInstance}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    toggle() {
        this.props.onToggle(this.props.expanded);
    },
    pin() {
        this.props.onPin(this.props.pinned);
    },
    timeOut: null
});

module.exports = SidePanel;
