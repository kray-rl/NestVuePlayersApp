import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayerService {
    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }
    // fetch all players
    async getAllPlayers(): Promise<Player[]> {
        const players = await this.playerModel.find().exec();
        return players;
    }
    // fetch top players
    async getTopPlayers(): Promise<Player[]> {
        const players = await this.playerModel.find().exec();
        return players;
    }
}