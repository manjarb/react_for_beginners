/*
 Store Picker
 This will let us make <StorePicker/>
 */

import React from 'react';
import { browserHistory } from 'react-router';
import h from '../helpers';
import { Navigation } from 'react-router';

var StorePicker = React.createClass({
    goToStore: function (event) {
        event.preventDefault();
        // get data from input
        var storeId = this.refs.storeId.value;
        browserHistory.push('/store/' + storeId,null);
        // transition from <Storepicker> to <App>
    },

    render :function () {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please Enter a Store</h2>
                <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
                <input type="submit"/>
            </form>
        )
    }

});

export default StorePicker;