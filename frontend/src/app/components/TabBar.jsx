import React from 'react';
import style from './TabBar.module.css';
import Button from './Button';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0
        }
        this.changeTab = this.changeTab.bind(this);
    }

    changeTab(tabIndex) {
        this.setState(state => ({
            tabIndex: tabIndex
        }))
        this.props.changeTab(tabIndex)
    }

    render() {
        return(
            <div className={ style.base }>
                <div className={ style.grid }>
                    <div className={style.nameContainer}>
                        <h3 className={ style.appName }>Walla</h3>
                    </div>
                    <div className={ style.btnContainer}>

                        <Button onClick={() => this.changeTab(0)} className={`btn-${(this.state.tabIndex === 0)? "primary": "dark"}--text`}>Home</Button>
                        <Button onClick={() => this.changeTab(1)} className={`btn-${(this.state.tabIndex === 1)? "primary": "dark"}--text`}>Explore</Button>

                    </div>

                    <div className={ style.searchBarContainer }>
                        <form className={ style.oSearch }>
                            <input className={ style.oSearchInput } placeholder="Search photos" type="text" name="main-search"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}