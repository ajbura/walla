import React from 'react';
import style from './ImageGrid.module.css';
import Dialog, { dialogViewer, dialogRemover } from '../components/Dialog';
import Button from '../components/Button';

export default class ImageGrid extends React.Component {
    constructor(props) {
        super(props);

        this.getGrid = this.getGrid.bind(this);
        this.getEmptyGrid = this.getEmptyGrid.bind(this);
        this.viewPhoto = this.viewPhoto.bind(this);
    }

    render() {
        return(
            <React.Fragment>
                {this.getGrid(this.props.photos)}
            </React.Fragment>
        );
    }

    getGrid(photos) {
        if (photos.length === 0) return this.getEmptyGrid();

        const grid = [];
        for (let index = 0; index < photos.length; index += 5) {

            const maxThumbs = (photos.length < index + 5)? photos.length - index: 5;
            const row = [];

            for (let i = 0; i < maxThumbs; i++) {
                row.push(
                    <div key={index + i} 
                        onClick={this.viewPhoto.bind(this, photos[index + i])}
                        style={{backgroundColor: photos[index + i].color, backgroundImage: `url(${photos[index + i].urls.small})` }} 
                        className={ `${style.thumb} ${((index % 2 === 0)? i === 0 && style.tLeft: i === 4 && style.tRight)}` }>
                            
                        <div className={style.userContainer}>
                            <div style={{ backgroundImage: `url(${photos[index + i].user.profile_image.small})` }} className={style.profileImage}></div>
                            <a onClick={e => e.stopPropagation()} href={photos[index + i].user.links.html} target="__blank">
                                <span className={style.username}>{photos[index + i].user.name}</span>
                            </a>
                        </div>
                    </div>
                );
            }

            grid.push(<div key={index} className={style.grid}>{row}</div>)
        }

        return grid;
    }

    getEmptyGrid() {
        return (
            <div className={style.grid}>
                <div className={style.thumb + " " + style.tLeft}></div>
                <div className={style.thumb}></div>
                <div className={style.thumb}></div>
                <div className={style.thumb}></div>
                <div className={style.thumb}></div>
            </div>
        );
    }

    viewPhoto(photo) {
        dialogViewer(
            <Dialog>
                <div className={style.image__header}>
                    <div className={style.image__infoContainer}>
                        <div style={{ backgroundImage: `url(${photo.user.profile_image.small})` }} className={style.image__profileImage}></div>
                        <a href={photo.user.links.html} target="__blank">
                            <span className={style.image__username}>{photo.user.name}</span>
                        </a>
                    </div>
                    <Button className="btn-dark--text" onClick={dialogRemover}>Close</Button>
                </div>
                <a href={photo.links.html} target="__blank">
                    <img src={photo.urls.regular} 
                        style={{
                            backgroundColor: photo.color,
                            maxWidth: "100%",
                        }} 
                    />
                </a>
            </Dialog>
        )
    }

}