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
        return players.slice(0,5);
    }

    playersToNormal(playersFromBase){
        const playersToFront = [];
        for(let player of playersFromBase){
            let expCycle: number = 0;
            let moneyCycle: number = 0;


            for (let item of JSON.parse(player.resources)){
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
            return (b["exp"]+b["money"]) - (a["exp"]+a["money"]);
        });
        playersToFront.forEach((el, i, plrs) =>{
            if ( i != 0 && ((el.exp == plrs[i-1].exp && el.money == plrs[i-1].money) || el.exp+el.money == plrs[i-1].exp+plrs[i-1].money)) el.place = plrs[i-1].place
            else el.place = i+1
        })
        return playersToFront;
    }
}