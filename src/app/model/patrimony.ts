import { Location } from './location';
import { AcquisitionMethod } from './acquisition-method';

export interface Patrimony {
    patrimonyId: number;
    acquisitionProcessId: string;
    serialNumber: string;
    description: string;
    commercialInvoice: string;
    model: string;
    brand: string;
    additionalInformation: string;
    value: number;
    location: Location;
    acquisitionMethod: AcquisitionMethod;
    chosen: boolean;
    status: number;
}
