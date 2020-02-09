import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('api')
export class PlayerController {
    constructor(private playerService: PlayerService) { }


    // Retrieve customers list
    @Get('players')
    async getAllPlayers(@Res() res) {
        const players = await this.playerService.getAllPlayers();
        return res.status(HttpStatus.OK).json(players);
    }

    // Retrieve customers list
    @Get('players/top')
    async getTopPlayers(@Res() res) {
        const players = await this.playerService.getTopPlayers();
        return res.status(HttpStatus.OK).json(players);
    }

}