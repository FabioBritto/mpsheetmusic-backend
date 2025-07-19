import { UpdateMusicUseCase } from "../../application/use-cases/update.music-usecase";

export const UpdateMusicUseCaseProvider = {
    provide: 'UpdateMusicUseCase',
    useClass: UpdateMusicUseCase,
}