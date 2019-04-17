export class ApiConfig {
    public static API_ENDPOINT = 'https://0ca486c6.ngrok.io/';

    public static LOCATIONS = {
        Base: ApiConfig.API_ENDPOINT + 'locations'
    };

    public static ACQUISITION_METHODS = {
        Base: ApiConfig.API_ENDPOINT + 'acquisitionmethods'
    }

    public static PATRIMONIES = {
        Base: ApiConfig.API_ENDPOINT + 'patrimonies'
    }
}