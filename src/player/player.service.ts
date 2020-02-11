import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayerService {
    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { }
    // fetch all players
    async getAllPlayers(): Promise<Player[]> {
        const players = await this.playersToNormal(await this.playerModel.find().exec());
        return players;
    }
    // fetch top players
    async getTopPlayers(): Promise<Player[]> {
        const players = await this.playersToNormal(await this.playerModel.find().exec());
        return players.filter(player => player.place <= 5);
    }

    playersToNormal(playersFromBase){
        const playersToFront = [];
        for(const player of playersFromBase){
            let expCycle = 0;
            let moneyCycle = 0;


            for (const item of JSON.parse(player.resources)){
                if (item.resource == 'ACTIVERATE' || item.resource == 'PASSIVERATE'){
                    expCycle += item.value;
                }
                else if(item.resource == 'MONEY') moneyCycle += item.value;
            }
            playersToFront.push({
                place: 0,
                fio: player.fio,
                status: player.level,
                exp: expCycle,
                money: moneyCycle
            })
        }
        playersToFront.sort(function(a, b) {
            return b["exp"] - a["exp"] || b["money"] - a["money"];
        });
        playersToFront.forEach((el, i, playersToFront) => {
            if (i != 0 && el.exp == playersToFront[i - 1].exp && el.money == playersToFront[i - 1].money) el.place = playersToFront[i - 1].place;
            else if (i == 0) el.place = 1;
            else el.place = playersToFront[i-1].place + 1;
        })
        return playersToFront;
    }
}