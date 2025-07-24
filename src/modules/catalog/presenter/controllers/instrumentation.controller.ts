import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { InstrumentationApplicationService } from "../../application/services/instrumentation-application.service";
import { CreateInstrumentationDTO } from "../dtos/create-instrumentation-dto";
import { UpdateInstrumentationDTO } from "../dtos/update-instrumentation-dto";

@Controller('/instrumentation')
export class InstrumentationController {
    constructor(
        private readonly instrumentationApplicationService: InstrumentationApplicationService,
    ) {}

    @Post()
    async create(@Body() createInstrumentationDTO: CreateInstrumentationDTO) {
        return this.instrumentationApplicationService.create(createInstrumentationDTO);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() updateInstrumentationDTO: UpdateInstrumentationDTO) {
        return this.instrumentationApplicationService.update(id, updateInstrumentationDTO);
    }

    @Get()
    async findAll() {
        return this.instrumentationApplicationService.findAll();
    }

    @Get('/:id')
    async findOneById(@Param('id') id: number) {
        return this.instrumentationApplicationService.findOneById(id);
    }
} 