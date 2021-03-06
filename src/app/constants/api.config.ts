import { PatrimonyStatus } from './patrimony-status.enum';
import { environment } from '../../environments/environment'

export class ApiConfig {
    public static API_ENDPOINT = environment.API_ENDPOINT;

    public static LOCATIONS = {
        Base: ApiConfig.API_ENDPOINT + 'locations'
    };

    public static ACQUISITION_METHODS = {
        Base: ApiConfig.API_ENDPOINT + 'acquisitionmethods'
    };

    public static PATRIMONIES = {
        AllActives: ApiConfig.API_ENDPOINT + 'patrimonies/getByStatus/' + PatrimonyStatus.Active,
        AllPending: ApiConfig.API_ENDPOINT + 'patrimonies/getByStatus/' + PatrimonyStatus.Process,
        AllWritedOff: ApiConfig.API_ENDPOINT + 'patrimonies/getByStatus/' + PatrimonyStatus.WritedOff,
        Base: ApiConfig.API_ENDPOINT + 'patrimonies',
        CancelWriteOff: ApiConfig.API_ENDPOINT + 'patrimonies/cancelWriteOff',
        ExportExcel: ApiConfig.API_ENDPOINT + 'patrimonies/export',
        WriteOff: ApiConfig.API_ENDPOINT + 'patrimonies/writeOff'
    };

    public static USERS = {
        Base: ApiConfig.API_ENDPOINT + 'users',
        ChangePassword: ApiConfig.API_ENDPOINT + 'users/changePassword'
    }

    public static LOGIN = ApiConfig.API_ENDPOINT + 'login';

    public static LOGS = ApiConfig.API_ENDPOINT + 'logs';

    public static REPORTS = {
        LocationPatrimonies: ApiConfig.API_ENDPOINT + 'reports/locationsPatrimonies/',
        LocationsPatrimonies: ApiConfig.API_ENDPOINT + 'reports/locationsPatrimonies',
        WritedOffByYearAndMonth: ApiConfig.API_ENDPOINT + 'reports/writedOffByYearAndMonth/',
        GetMinMaxYearWritedOff: ApiConfig.API_ENDPOINT + 'reports/getMinMaxYearWritedOff'
    }
}