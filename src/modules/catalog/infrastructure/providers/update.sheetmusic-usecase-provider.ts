import { UpdateSheetMusicUseCase } from "../../application/use-cases/update.sheetmusic-usecase";

export const UpdateSheetMusicUseCaseProvider = {
    provide: 'UpdateSheetMusicUseCase',
    useClass: UpdateSheetMusicUseCase,
}; 