import { CreateMusicUseCase } from "../../application/use-cases/create.music-usecase";

export const CreateMusicUseCaseProvider = {
    provide: 'CreateMusicUseCase',
    useClass: CreateMusicUseCase,
}