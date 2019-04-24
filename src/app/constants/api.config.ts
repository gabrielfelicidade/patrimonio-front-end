export class ApiConfig {
    public static API_ENDPOINT = 'http://localhost:8090/';

    public static LOCATIONS = {
        Base: ApiConfig.API_ENDPOINT + 'locations'
    };

    public static ACQUISITION_METHODS = {
        Base: ApiConfig.API_ENDPOINT + 'acquisitionmethods'
    };

    public static PATRIMONIES = {
        Base: ApiConfig.API_ENDPOINT + 'patrimonies'
    };

    public static USERS = {
        Base: ApiConfig.API_ENDPOINT + 'users'
    }

    public static LOGIN = ApiConfig.API_ENDPOINT + 'login';
}