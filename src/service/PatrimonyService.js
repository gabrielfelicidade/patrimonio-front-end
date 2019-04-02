import axios from 'axios';

export class PatrimonyService {

    getPatrimoniesSmall() {
        return axios.get('assets/demo/data/cars-small.json')
            .then(res => res.data.data);
    }

    getPatrimoniesMedium() {
        return axios.get('assets/demo/data/cars-medium.json')
            .then(res => res.data.data);
    }

    getPatrimoniesLarge() {
        return axios.get('assets/demo/data/cars-large.json')
            .then(res => res.data.data);
    }
}