import { Patrimony } from './patrimony';

export interface Location {
    locationId: number;
    description: string;
    patrimonies: Patrimony[];
}
