import {Component, createRef} from 'react';
import ReactMapGL from 'react-map-gl';
import {layers} from '../utils';
class Map extends Component {
    mapRef = createRef(null);
    map = null;
    state = {
        token: process.env.MAPBOX_TOKEN,
        viewport: {
            width: '100vw',
            height: '100vh',

            latitude: 35.8788409,
            longitude: -115.595196,
            zoom: 7
        }
    };

    handleZoom = (zoomIn = false) => {
        const {viewport} = this.state;

        const newZoom = zoomIn ? Number(viewport.zoom + 0.1) : Number(viewport.zoom - 0.1);
        console.log({newZoom});
        this.setState({
            viewport: {...viewport, zoom: newZoom}
        });
    };

    handleResize = () => {
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const {viewport} = this.state;

        this.handleZoom(viewport.height + viewport.width > Number(w) + Number(h));

        this.setState({
            viewport: {
                ...viewport,
                height: h,
                width: w
            }
        });
    };

    /** ADD SOURCE */

    addSource = () => {
        this.map &&
            this.map.addSource('earthquakes', {
                type: 'geojson',
                // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
                // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
                data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });
    };

    /** PROCESS LAYERS */
    processLayers = () => {
        (layers || []).forEach((layer) => {
            this.map && this.map.addLayer(layer);
        });
    };

    /** PROCESS EVENTS */

    processEvents = () => {
        if (!this.map) return;

        this.map.on('click', 'clusters', (e) => {
            const features = this.map.queryRenderedFeatures(e.point, {layers: ['clusters']});
            const clusterId = features[0].properties.cluster_id;
            this.map.getSource('earthquakes').getClusterExpansionZoom(clusterId, (err, zoom) => {
                if (err) return;

                this.map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            });
        });

        this.map.on('mouseenter', 'clusters', () => {
            this.map.getCanvas().style.cursor = 'pointer';
        });
        this.map.on('mouseleave', 'clusters', () => {
            this.map.getCanvas().style.cursor = '';
        });
    };

    /** ONN LOAD */
    componentDidMount = () => {
        const {current: mapRef} = this.mapRef;
        this.map = mapRef.getMap();

        window.addEventListener('resize', this.handleResize);

        this.map &&
            this.map.on('load', () => {
                this.addSource();
                this.processLayers();
                this.processEvents();
            });
    };

    render() {
        const {token, viewport} = this.state;
        return (
            <ReactMapGL
                ref={this.mapRef}
                mapStyle="mapbox://styles/mapbox/dark-v10"
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
