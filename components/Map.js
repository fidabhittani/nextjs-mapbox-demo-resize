import {Component, createRef} from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {
    mapRef = createRef(null);

    state = {
        token: process.env.MAPBOX_TOKEN,
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
        });
    };

    render() {
        const {token, viewport} = this.state;
        return (
            <ReactMapGL
                ref={this.mapRef}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={`${token}`}
                {...viewport}
                onViewportChange={(viewport) => {
                    this.setState({viewport});
                }}
            />
        );
    }
}

export default Map;
