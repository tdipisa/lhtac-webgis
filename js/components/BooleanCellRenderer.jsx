
const React = require('react');

const BooleanCellRenderer = React.createClass({
    propTypes: {
        params: React.PropTypes.object
    },
    render() {
        let field = this.props.params.colDef.field;
        let myProp = field.substr("properties.".length, field.length);
        let ret = this.props.params.data.properties[myProp].toString();
        return <span>{ret}</span>;
    }
});


module.exports = BooleanCellRenderer;
