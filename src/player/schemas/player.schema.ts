import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
    idNode: Number,
    fio: String,
    sex: String,
    idParent: Number,
    idRole: Number,
    idZone: Number,
    idInstance: Number,
    level: String,
    levelOrder: Number,
    resources: [{
      resource: String,
      value: Number
    }]
})