import React from 'react';
import style from './Gallery.module.css';

export default class Gallery extends React.Component {

    render() {
        return(
            <section className={ style.container }>
                {this.props.children}
            </section>
        );
    }
}

