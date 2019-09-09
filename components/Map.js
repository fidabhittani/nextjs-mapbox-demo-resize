import {Component, createRef} from 'react';
import ReactMapGL from 'react-map-gl';
import {locationsList, layers} from '../utils';

class Map extends Component {
    mapRef = createRef(null);
    map = null;
    state = {
        token: process.env.MAPBOX_TOKEN,
        viewport: {
            width: '100vw',
            height: '100%',

            latitude: -33.7988,
            longitude: 151.1,
            zoom: 5
        }
    };

    handleZoom = (zoomIn = false) => {
        const {viewport} = this.state;

        const newZoom = zoomIn ? Number(viewport.zoom + 0.1) : Number(viewport.zoom - 0.1);
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
        this.map.addSource('data_markers', {
            type: 'geojson',
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50,
            data: locationsList
        });
    };

    /** PROCESS LAYERS */
    processLayers = async () => {
        layers.forEach((layer) => this.map.addLayer(layer));

        /** Load and Add Icons to map before using them */
        this.map.loadImage('/static/marker-blue.png', (error, blueMarker) => {
            this.map.loadImage('/static/marker-grey.png', (error, greyMarker) => {
                this.map.addImage('greyMarker', greyMarker);
                this.map.addImage('blueMarker', blueMarker);

                /** InACTIVE MARKERS */

                ['active', 'inactive'].forEach((layer) => {
                    const activeLayer = layer === 'active';

                    this.map.addLayer({
                        id: `unclustered-point-${layer}`,
                        type: 'symbol',
                        source: 'data_markers',
                        filter: ['!', ['has', 'point_count']],
                        filter: ['==', 'active', !!activeLayer],

                        layout: {
                            'icon-image': activeLayer ? 'blueMarker' : 'greyMarker',
                            'icon-size': 1
                        }
                    });
                });
            });
        });
    };

    /** PROCESS EVENTS */

    processEvents = () => {
        if (!this.map) return;

        this.map.on('click', 'clusters', (e) => {
            const features = this.map.queryRenderedFeatures(e.point, {layers: ['clusters']});
            const clusterId = features[0].properties.cluster_id;
            this.map.getSource('data_markers').getClusterExpansionZoom(clusterId, (err, zoom) => {
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

    /** Process Markers */

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
