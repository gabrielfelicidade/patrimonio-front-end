import axios from 'axios';

export class LocationService {
    
    getLocationsSmall() {
        return axios.get('assets/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    getLocationsMedium() {
        return axios.get('assets/demo/data/cars-medium.json')
                .then(res => res.data.data);
    }

    getLocationsLarge() {
        return axios.get('assets/demo/data/cars-large.json')
                .then(res => res.data.data);
    }
}