import axios from 'axios';

export class LocationService {

    getAll() {
        return axios.get('http://localhost:8090/locations')
            .then(res => res);
    }

    insert(data) {
        return axios.post('http://localhost:8090/locations', data)
            .then(res => res);
    }
}