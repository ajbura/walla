import React from 'react';
import './App.css';

import TabBar from './components/TabBar';
import Gallery from './layouts/Gallery';
import Collection from './layouts/Collection';
import Explore from './layouts/Explore';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
            totalTabs: 3
        }

        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(tabIndex) {
        if (tabIndex < 0 && tabIndex >= totalTabs) return;

        this.setState(state => ({
            tabIndex: tabIndex
        }))
    }

    render() {
        return(
            <React.Fragment>
                <TabBar changeTab={this.changeTab}></TabBar>
                <Gallery>
                    {this.state.tabIndex === 0 && <Collection></Collection>}
                    {this.state.tabIndex === 1 && <Explore></Explore>}
                </Gallery>
            </React.Fragment>
        );
    }
}