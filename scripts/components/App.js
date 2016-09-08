import React from 'react';
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';

// Firebase
import Rebase  from 're-base';
var base = Rebase.createClass('https://react-for-beginners-1eda5.firebaseio.com/');

/*
 App
 */

var App = React.createClass({
    mixins : [Catalyst.LinkedStateMixin],
    getInitialState: function () {
        return {
            fishes : {},
            order : {}
        }
    },
    componentDidMount : function () {
        base.syncState(this.props.params.storeId + "/fishes",{
            context : this,
            state:'fishes'
        });

        var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

        if(localStorageRef) {
            // update our component state to reflect what is in localStorage
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }

    },
    componentWillUpdate : function (nextProps,nextState) {
        localStorage.setItem('order-' + this.props.params.storeId,JSON.stringify(nextState.order));
    },
    addToOrder : function (key) {
        this.state.order[key] = this.state.order[key] + 1 || 1;
        this.setState({ order : this.state.order });
    },
    removeFromOrder : function (key) {
        delete this.state.order[key];
        this.setState({ order : this.state.order });
    },
    addFish: function (fish) {
        var timestamp = (new Date()).getTime();

        // update the state object
        this.state.fishes['fish-' + timestamp] = fish;
        // set the state
        this.setState({ fishes : this.state.fishes });

    },
    removeFish : function (key) {
        if(confirm("Are you sure remove")) {
            this.state.fishes[key] = null;
            this.setState({fishes: this.state.fishes});
        }
    },
    loadSamples : function () {
        this.setState({
            fishes: require('../sample-fishes')
        })
    },
    renderFish : function (key) {
        return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
    },
    updateFishDataWithInput : function (key,value,input_part) {
        // update the state object

        this.state.fishes[key][input_part] = value;
        this.setState({ fishes : this.state.fishes })
    },
    render : function () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh food markkk"/>
                    {/*<Fish/>*/}
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(key => this.renderFish(key))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes}
                       order={this.state.order}
                       removeFromOrder={this.removeFromOrder}/>
                <Inventory addFish={this.addFish}
                           loadSamples={this.loadSamples}
                           fishes={this.state.fishes} linkState={this.linkState}
                           updateFishDataWithInput={this.updateFishDataWithInput}
                           removeFish={this.removeFish}/>
            </div>
        )
    }
});

export default App;