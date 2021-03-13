import React from 'react';
import style from './Explore.module.css';
import ImageGrid from './ImageGrid';
import Button from '../components/Button';

export default class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            photos: []
        }

        this.getPhotos = this.getPhotos.bind(this);
    }
    componentDidMount() {
        this.getPhotos(this.state.page);
    }
    render() {
        return(
            <div className={style.container}>
                <ImageGrid photos={this.state.photos}></ImageGrid>

                {
                    this.state.photos.length !== 0 && <div className={style.btnContainer}>
                        <Button onClick={() => this.getPhotos(this.state.page)} className="btn-primary--contained">Load More</Button>
                    </div>
                }
            </div>
        );
    }

    getPhotos(page) {
        if (page === undefined) return console.warn('Please pass page inded in getPhotos!')
        fetch(`http://localhost:3000/explore?page=${page}`)
        .then(response => response.json())
        .then(result => {
            
            this.setState(state => ({
                page: state.page + 1,
                photos: state.photos.concat(result)
            }))
        })
    }
}