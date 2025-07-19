import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { GenreApplicationService } from "../../application/services/genre-application.service";
import { CreateGenreDTO } from "../dtos/create-genre-dto";
import { UpdateGenreDTO } from "../dtos/update-genre-dto";

@Controller('/genre')
export class GenreController {
    constructor(
        private readonly genreApplicationService: GenreApplicationService,
    ) {}

    @Post()
    async create(@Body() createGenreDTO: CreateGenreDTO) {
        return this.genreApplicationService.create(createGenreDTO);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() updateGenreDTO: UpdateGenreDTO) {
        return this.genreApplicationService.update(id, updateGenreDTO);
    }

    @Get()
    async findAll() {
        return this.genreApplicationService.findAll();
    }

    @Get('/:id')
    async findOneById(@Param('id') id: number) {
        return this.genreApplicationService.findOneById(id);
    }
} 