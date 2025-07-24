import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instrumentation } from "../domain/entity/instrumentation-entity";
import { InstrumentationController } from "../presenter/controllers/instrumentation.controller";
import { InstrumentationApplicationService } from "../application/services/instrumentation-application.service";
import { InstrumentationRepository } from "./repositories/instrumentation.repository";
import { InstrumentationDomainProvider } from "./providers/instrumentation.domain.provider";
import { CreateInstrumentationUseCaseProvider } from "./providers/create.instrumentation-usecase-provider";
import { UpdateInstrumentationUseCaseProvider } from "./providers/update.instrumentation-usecase-provider";

@Module({
    imports: [TypeOrmModule.forFeature([Instrumentation])],
    controllers: [InstrumentationController],
    providers: [
        InstrumentationApplicationService,
        InstrumentationRepository,
        InstrumentationDomainProvider,
        CreateInstrumentationUseCaseProvider,
        UpdateInstrumentationUseCaseProvider,
    ],
    exports: [InstrumentationApplicationService],
})
export class InstrumentationModule {} 