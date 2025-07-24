import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SheetMusic } from "../domain/entity/sheet.music-entity";
import { SheetMusicController } from "../presenter/controllers/sheetmusic.controller";
import { SheetMusicApplicationService } from "../application/services/sheetmusic-application.service";
import { SheetMusicRepository } from "./repositories/sheetmusic.repository";
import { SheetMusicDomainProvider } from "./providers/sheetmusic.domain.provider";
import { CreateSheetMusicUseCaseProvider } from "./providers/create.sheetmusic-usecase-provider";
import { UpdateSheetMusicUseCaseProvider } from "./providers/update.sheetmusic-usecase-provider";

@Module({
    imports: [TypeOrmModule.forFeature([SheetMusic])],
    controllers: [SheetMusicController],
    providers: [
        SheetMusicApplicationService,
        SheetMusicRepository,
        SheetMusicDomainProvider,
        CreateSheetMusicUseCaseProvider,
        UpdateSheetMusicUseCaseProvider,
    ],
    exports: [SheetMusicApplicationService],
})
export class SheetMusicModule {} 