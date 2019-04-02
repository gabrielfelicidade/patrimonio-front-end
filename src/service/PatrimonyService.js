import axios from 'axios';

export class PatrimonyService {

    getAll() {
        return axios.get('http://localhost:8090/patrimonies')
            .then(res => res);
    }

    insert(data) {
        return axios.post('http://localhost:8090/patrimonies', data)
            .then(res => res);
    }
    
}