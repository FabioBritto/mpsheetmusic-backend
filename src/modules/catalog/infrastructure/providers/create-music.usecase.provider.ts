import { CreateMusicUseCase } from "../../application/use-cases/create-music-use-case";

export const CreateMusicUseCaseProvider = {
    provide: 'CreateMusicUseCase',
    useClass: CreateMusicUseCase,
}