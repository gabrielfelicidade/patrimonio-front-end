import axios from 'axios';

export class AcquisitionMethodService {

    getAll() {
        return axios.get('http://localhost:8090/acquisitionmethods')
            .then(res => res);
    }

    insert(data) {
        return axios.post('http://localhost:8090/acquisitionmethods', data).then(res => res);
    }
}