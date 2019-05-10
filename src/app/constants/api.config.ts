export class ApiConfig {
    public static API_ENDPOINT = 'http://localhost:8090/';

    public static LOCATIONS = {
        Base: ApiConfig.API_ENDPOINT + 'locations'
    };

    public static ACQUISITION_METHODS = {
        Base: ApiConfig.API_ENDPOINT + 'acquisitionmethods'
    };

    public static PATRIMONIES = {
        AllNotWriteOff: ApiConfig.API_ENDPOINT + 'patrimonies/getAllNotWriteOff',
        AllWritedOff: ApiConfig.API_ENDPOINT + 'patrimonies/writedoff',
        AllPending: ApiConfig.API_ENDPOINT + 'patrimonies/pending',
        Base: ApiConfig.API_ENDPOINT + 'patrimonies',
        ExportExcel: ApiConfig.API_ENDPOINT + 'patrimonies/export',
        WriteOff: ApiConfig.API_ENDPOINT + 'patrimonies/writeoff'
    };

    public static USERS = {
        Base: ApiConfig.API_ENDPOINT + 'users'
    }

    public static LOGIN = ApiConfig.API_ENDPOINT + 'login';
}