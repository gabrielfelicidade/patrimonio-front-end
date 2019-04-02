import axios from 'axios';

export class AcquisitionService {

    getAcquisitionsSmall() {
        return axios.get('assets/demo/data/cars-small.json')
            .then(res => res.data.data);
    }

    getAcquisitionsMedium() {
        return axios.get('assets/demo/data/cars-medium.json')
            .then(res => res.data.data);
    }

    getAcquisitionsLarge() {
        return axios.get('assets/demo/data/cars-large.json')
            .then(res => res.data.data);
    }
}