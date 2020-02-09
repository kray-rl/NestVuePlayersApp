import { Document } from 'mongoose';

export interface Player extends Document {
    readonly idNode: number;
    readonly fio: string;
    readonly sex: string;
    readonly idParent: number;
    readonly idRole: number;
    readonly idZone: string;
    readonly idInstance: number;
    readonly level: string;
    readonly levelOrder: number;
    readonly resources: [{
        readonly  resource: string;
        readonly  value: number;
    }];
}