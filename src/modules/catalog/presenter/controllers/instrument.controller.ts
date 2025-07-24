import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { InstrumentApplicationService } from "../../application/services/instrument-application.service";
import { CreateInstrumentDTO } from "../dtos/create-instrument-dto";
import { UpdateInstrumentDTO } from "../dtos/update-instrument-dto";

@Controller('/instrument')
export class InstrumentController {
    constructor(
        private readonly instrumentApplicationService: InstrumentApplicationService,
    ) {}

    @Post()
    async create(@Body() createInstrumentDTO: CreateInstrumentDTO) {
        return this.instrumentApplicationService.create(createInstrumentDTO);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() updateInstrumentDTO: UpdateInstrumentDTO) {
        return this.instrumentApplicationService.update(id, updateInstrumentDTO);
    }

    @Get()
    async findAll() {
        return this.instrumentApplicationService.findAll();
    }

    @Get('/:id')
    async findOneById(@Param('id') id: number) {
        return this.instrumentApplicationService.findOneById(id);
    }
} 