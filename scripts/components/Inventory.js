/* Inventory */

import React from 'react';
import AddFishForm from './AddFishForm';

var Inventory = React.createClass({
    renderInventory : function (key) {
        var linkState = this.props.linkState;
        var linkStateFishObject = linkState('fishes.'+ key + '.name');
        return (
            <div className="fish-edit" key={key}>
                {/*<input type="text" valueLink={linkState('fishes.'+ key + '.name')}/>*/}
                <input type="text"
                       value={this.props.fishes[key].name}
                       onChange={ e => this.props.updateFishDataWithInput(key,e.target.value,"name")}/>
                <input type="text"
                       value={this.props.fishes[key].price}
                       onChange={ e => this.props.updateFishDataWithInput(key,e.target.value,"price")}/>
                <select
                    onChange={e => this.props.updateFishDataWithInput(key,e.target.value,"status")}
                    value={this.props.fishes[key].status}>
                    <option value="unavailable">Sold Out!</option>
                    <option value="available">Fresh!</option>
                </select>
                <textarea
                    onChange={e => this.props.updateFishDataWithInput(key,e.target.value,"desc")}
                    value={this.props.fishes[key].desc}>
              </textarea>
                <input type="text"
                       value={this.props.fishes[key].image}
                       onChange={ e => this.props.updateFishDataWithInput(key,e.target.value,"image")}/>

                <button onClick={this.props.removeFish.bind(null,key)}>Remove Fish</button>
            </div>
        )
    },
    render : function () {
        console.log(this.props);
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm {...this.props}/>
                <button onClick={this.props.loadSamples}>Load Sample fishes</button>
            </div>
        )
    },
    propTypes : {
        addFish : React.PropTypes.func.isRequired,
        loadSamples : React.PropTypes.func.isRequired,
        fishes : React.PropTypes.object.isRequired,
        updateFishDataWithInput : React.PropTypes.func.isRequired,
        removeFish : React.PropTypes.func.isRequired
    }
});

export default Inventory;