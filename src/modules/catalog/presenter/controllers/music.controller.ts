import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MusicApplicationService } from "../../application/services/music-application.service";
import { CreateMusicDTO } from "../dtos/create-music-dto";

@Controller('/music')
export class MusicController {
    constructor(
        private readonly musicApplicationService: MusicApplicationService,
    ) {}

    @Post()
    async create(@Body() createMusicDTO: CreateMusicDTO) {
        return this.musicApplicationService.create(createMusicDTO);
    }

    @Get()
    async findAll() {
        return this.musicApplicationService.findAll();
    }

    @Get('/:id')
    async findOneById(@Param('id') id: number) {
        return this.musicApplicationService.findOneById(id);
    }

}