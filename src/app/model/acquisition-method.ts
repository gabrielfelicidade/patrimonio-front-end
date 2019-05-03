import { Patrimony } from './patrimony';

export interface AcquisitionMethod {
    acquisitionMethodId: number;
    description: string;
    patrimonies: Patrimony[];
}
