export const sampleMarkersGeoJSON = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                message: 'Foo',
                iconSize: [60, 60]
            },
            geometry: {
                type: 'Point',
                coordinates: [-66.324462890625, -16.024695711685304]
            }
        },
        {
            type: 'Feature',
            properties: {
                message: 'Bar',
                iconSize: [50, 50]
            },
            geometry: {
                type: 'Point',
                coordinates: [-61.2158203125, -15.97189158092897]
            }
        },
        {
            type: 'Feature',
            properties: {
                message: 'Baz',
                iconSize: [40, 40]
            },
            geometry: {
                type: 'Point',
                coordinates: [-63.29223632812499, -18.28151823530889]
            }
        }
    ]
};

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

export const locationsList = [
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
