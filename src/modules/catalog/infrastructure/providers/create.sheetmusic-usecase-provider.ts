import { CreateSheetMusicUseCase } from "../../application/use-cases/create.sheetmusic-usecase";

export const CreateSheetMusicUseCaseProvider = {
    provide: 'CreateSheetMusicUseCase',
    useClass: CreateSheetMusicUseCase,
}; 