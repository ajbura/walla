import React from 'react';
import ReactDom from 'react-dom';
import style from './Dialog.module.css';

export default class Dialog extends React.Component {
    render() {
        return(
            <div className={style.overlay} onClick={dialogRemover}>
                <div className={style.base} onClick={e => e.stopPropagation()}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}

export function dialogViewer(dialog) {
    document.getElementById('root').parentElement.style.overflow = 'hidden';
    ReactDom.render(dialog, document.getElementById('dialogContainer'));
}


export function dialogRemover() {
    ReactDom.unmountComponentAtNode(document.getElementById('dialogContainer'));
    document.getElementById('root').parentElement.style.overflow = 'auto';
}