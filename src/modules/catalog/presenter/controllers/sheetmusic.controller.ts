import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { SheetMusicApplicationService } from "../../application/services/sheetmusic-application.service";
import { CreateSheetMusicDTO } from "../dtos/create-sheetmusic-dto";
import { UpdateSheetMusicDTO } from "../dtos/update-sheetmusic-dto";

@Controller('/sheetmusic')
export class SheetMusicController {
    constructor(
        private readonly sheetMusicApplicationService: SheetMusicApplicationService,
    ) {}

    @Post()
    async create(@Body() createSheetMusicDTO: CreateSheetMusicDTO) {
        return this.sheetMusicApplicationService.create(createSheetMusicDTO);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() updateSheetMusicDTO: UpdateSheetMusicDTO) {
        return this.sheetMusicApplicationService.update(id, updateSheetMusicDTO);
    }

    @Get()
    async findAll() {
        return this.sheetMusicApplicationService.findAll();
    }

    @Get('/:id')
    async findOneById(@Param('id') id: number) {
        return this.sheetMusicApplicationService.findOneById(id);
    }
} 