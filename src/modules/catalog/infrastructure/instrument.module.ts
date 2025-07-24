import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instrument } from "../domain/entity/instrument-entity";
import { InstrumentController } from "../presenter/controllers/instrument.controller";
import { InstrumentApplicationService } from "../application/services/instrument-application.service";
import { InstrumentRepository } from "./repositories/instrument.repository";
import { InstrumentDomainProvider } from "./providers/instrument.domain.provider";
import { CreateInstrumentUseCaseProvider } from "./providers/create.instrument-usecase-provider";
import { UpdateInstrumentUseCaseProvider } from "./providers/update.instrument-usecase-provider";

@Module({
    imports: [TypeOrmModule.forFeature([Instrument])],
    controllers: [InstrumentController],
    providers: [
        InstrumentApplicationService,
        InstrumentRepository,
        InstrumentDomainProvider,
        CreateInstrumentUseCaseProvider,
        UpdateInstrumentUseCaseProvider,
    ],
    exports: [InstrumentApplicationService],
})
export class InstrumentModule {} 