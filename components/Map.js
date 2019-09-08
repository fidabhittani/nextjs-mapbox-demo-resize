import {Component, createRef} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
    mapRef = createRef(null);

    state = {
        viewport: {
            width: '100vw',
            height: '100vh',

            latitude: 41.5868,
            longitude: -93.625,
            zoom: 13
        }
    };

    componentDidMount = () => {
        window.addEventListener('resize', () => {
            const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

            const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            this.setState({
                viewport: {
                    ...this.state.viewport,
                    height: h,
                    width: w
                }
            });

            console.log('Rezised', {w, h});
        });
    };

    render() {
        return (
            <ReactMapGL
                ref={this.mapRef}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken="pk.eyJ1IjoiZGV2cGsiLCJhIjoiY2pyY2N3enlpMGR3dDN5cDQzcTFrZmV0aSJ9.wsCcKn40AES8XjYfNHOOlA"
                {...this.state.viewport}
                onViewportChange={(viewport) => {
                    console.log(viewport);
                    this.setState({viewport});
                }}
            />
        );
    }
}

export default Map;
