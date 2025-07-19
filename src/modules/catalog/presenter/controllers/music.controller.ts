import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { MusicApplicationService } from "../../application/services/music-application.service";
import { CreateMusicDTO } from "../dtos/create-music-dto";
import { UpdateMusicDTO } from "../dtos/update-music-dto";

@Controller('/music')
export class MusicController {
    constructor(
        private readonly musicApplicationService: MusicApplicationService,
    ) {}

    @Post()
    async create(@Body() createMusicDTO: CreateMusicDTO) {
        return this.musicApplicationService.create(createMusicDTO);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() updateMusicDTO: UpdateMusicDTO) {
        return this.musicApplicationService.update(id, updateMusicDTO);
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