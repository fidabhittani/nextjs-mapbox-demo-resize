const createNewLat = (latitude = 0, meters = 1000) => {
    const earth = 6378.137, //radius of the earth in kilometer
        pi = Math.PI,
        m = 1 / (((2 * pi) / 360) * earth) / 1000; //1 meter in degree

    return latitude + meters * m;
};

const createNewLon = (longitude = 0, latitude = 0, meters = 1000) => {
    const earth = 6378.137, //radius of the earth in kilometer
        pi = Math.PI,
        cos = Math.cos,
        m = 1 / (((2 * pi) / 360) * earth) / 1000; //1 meter in degree

    return longitude + (meters * m) / cos(latitude * (pi / 180));
};

const size = {
    width: `31px`,
    height: `41px`
};

export const locationsList2 = [
    {
        name: 'Bobbin Head',
        latitude: -33.655546,
        longitude: 151.160852,
        status: 'inactive',
        size: {...size}
    },
    {
        name: 'Liverpool',
        latitude: -33.929079,
        longitude: 150.920983,
        status: 'active',
        size: {...size}
    },
    {
        name: 'The Rocks',
        latitude: -33.8599,
        longitude: 151.2,
        status: 'active',
        size: {...size}
    },
    {
        name: 'Darling Harbour',
        latitude: -33.8749,
        longitude: 151.2,
        status: 'active',
        size: {...size}
    },
    {
        name: 'Darling Harbour 66',
        latitude: createNewLat(-33.8749, 1300),
        longitude: createNewLon(151.2, -33.8749, 1300),
        status: 'inactive',
        size: {...size}
    },
    {
        name: 'Darling Harbour 77',
        latitude: createNewLat(-33.8749, 1200),
        longitude: createNewLon(151.2, -33.8749, 1200),
        status: 'active',
        size: {...size}
    },
    {
        name: 'Darling Harbour 66',
        latitude: createNewLat(-33.8749),
        longitude: createNewLon(151.2, -33.8749),
        status: 'inactive',
        size: {...size}
    },
    {
        name: 'Darling Harbour 44',
        latitude: createNewLat(-33.8749, 800),
        longitude: createNewLon(151.2, -33.8749, 800),
        status: 'active',
        size: {...size}
    },
    {
        name: 'Darling Harbour 4',
        latitude: createNewLat(-33.8749, 500),
        longitude: createNewLon(151.2, -33.8749, 500),
        status: 'inactive',
        size: {...size}
    },

    {
        name: 'Pyrmont',
        latitude: -33.8737,
        longitude: 151.1957,
        status: 'active',
        size: {...size}
    },
    {
        name: 'Pyrmont 2',
        latitude: createNewLat(-33.8737),
        longitude: createNewLon(151.1957, -33.8737),
        status: 'inactive',
        size: {...size}
    }
];

export const locationsList = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [150.57861328125, -34.05265942137597]
            }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [150.0732421875, -34.488447837809304]
            }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [149.52392578125, -33.669496972795535]
            }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [149.1943359375, -34.74161249883172]
            }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [150.0732421875, -35.78217070326606]
            }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [150.62255859375, -32.8795871730663]
            }
        }
    ]
};

const mapLayers = [
    {
        id: 'clusters',
        type: 'circle',
        source: 'data_markers',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
        }
    },
    {
        id: 'cluster-count',
        type: 'symbol',
        source: 'data_markers',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 15,
            'icon-image': '{marker-symbol}',
            'icon-size': 1
        },
        paint: {
            'text-color': 'white'
        }
    }
];

export const layers = mapLayers;
