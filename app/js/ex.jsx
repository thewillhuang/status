'use strict';
/** @jsx React.DOM */
var React = require('react');

function copy(obj) {
    var newObj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

var Cell = React.createClass({
    propTypes: {
        data: React.PropTypes.string.isRequired,
        // Will be called with the new value for the cell
        onChange: React.PropTypes.func.isRequired
    },
    handleChange: function(evt) {
        this.props.onChange(evt.target.value);
    },
    render: function() {
        return <input value={this.props.data} onChange={this.handleChange} />;
    }
});

var Row = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        // Will be called with a cell's name and its new value
        onCellChange: React.PropTypes.func.isRequired
    },
    handleChange: function(prop, val) {
        // (Since this function simply calls this.props.onCellChange, we could
        // instead refer to the callback directly below.)
        this.props.onCellChange(prop, val);
    },
    render: function() {
        return <div className="row">
            <Cell data={this.props.data.name}
                  onChange={this.handleChange.bind(null, "name")} />
            <Cell data={this.props.data.location}
                  onChange={this.handleChange.bind(null, "location")} />
            <Cell data={this.props.data.phone}
                  onChange={this.handleChange.bind(null, "phone")} />
        </div>;
    }
});

var Grid = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired,
        // Will be called with a cell's row index, name, and new value
        onCellChange: React.PropTypes.func.isRequired
    },
    render: function() {
        var rows = this.props.data.map(function(rowData, index) {
            return <Row key={index} data={rowData}
                        onCellChange={this.props.onCellChange.bind(null, index)} />;
        }, this);
        return <div className="table">{rows}</div>;
    }
});

var Editor = React.createClass({
    getInitialState: function() {
        return {data: this.props.initialData};
    },
    handleCellChange: function(rowIdx, prop, val) {
        // If we were lazy here, we would simply write
        //     this.state.data[rowIdx][prop] = val;
        //     this.forceUpdate();
        // but mutating in this way can be confusing and prevents performance
        // optimizations later, so we instead treat the current data as
        // immutable and copy it when modifying:
        var row = copy(this.state.data[rowIdx]);
        row[prop] = val;
        var rows = this.state.data.slice();
        rows[rowIdx] = row;
        this.setState({data: rows});
    },
    handleButtonClick: function() {
        console.log(this.state.data);
    },
    render: function() {
        return <div>
            <Grid data={this.state.data} onCellChange={this.handleCellChange} />
            <button type="button" onClick={this.handleButtonClick}>Update</button>
        </div>;
    }
});

var company = {
    employees: [
        {id: "1", name: "Peter", location: "IT", phone: "555-1212"},
        {id: "2", name: "Samir", location: "IT", phone: "555-1213"},
        {id: "3", name: "Milton", location: "loading dock", phone: "none"}
    ]
};


React.render(
    <Editor initialData={company.employees} />,
    document.getElementById('appRoot')
);
