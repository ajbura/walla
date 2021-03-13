import React from 'react';
import style from './Collection.module.css';
import Button from '../components/Button';
import ImageGrid from './ImageGrid';

let collNames = ['Animals', 'Portrait', 'Cars', 'Nature', 'flower', 'Neon'];


export default class Collection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: {}
        };
        
        this.renderGrid = this.renderGrid.bind(this);
        this.renderCollection = this.renderCollection.bind(this);
    }

    componentDidMount() {

        collNames.forEach(coll => {
            fetch(`http://localhost:3000/collections?slug=${coll}`)
            .then(res => res.json())
            .then(result => {
                
                const collections = this.state.collections;
                collections[coll] = result;

                this.setState({ collections: collections });
            })
        })
    }

    render() {
        return collNames.map((coll, index) => this.renderCollection(coll, index));
    }
  

    renderCollection(coll, index) {
        const isDataAvail = (typeof this.state.collections[coll] !== "undefined");
        return (
            <div key={index} className={ style.card }>
                <div className={ style.header }>
                    <div>
                        <h3 className={style.collName}>{coll}</h3>
                        <span className={style.collTotal}>{isDataAvail && `${this.state.collections[coll].total_photos} photos - Created by ${this.state.collections[coll].user.name}`}</span>
                    </div>
                    {isDataAvail && <a href={`https://unsplash.com/collections/${this.state.collections[coll].id}/${this.state.collections[coll].title}`} target="__blank"><Button className="btn-primary--text">{`View More`}</Button></a>}
                </div>
                { this.renderGrid(coll) }
            </div>
        );
    }

    renderGrid(coll) {
        if (typeof this.state.collections[coll] === "undefined") return <ImageGrid photos={[]}></ImageGrid>
        const photos = this.state.collections[coll].photos;
        const maxThumbs = (photos.length < 5)? photos.length: 5;

        return  <ImageGrid photos={photos.slice(0, maxThumbs)}></ImageGrid>;
    }

}


