import { UpdateInstrumentUseCase } from "../../application/use-cases/update.instrument-usecase";

export const UpdateInstrumentUseCaseProvider = {
    provide: 'UpdateInstrumentUseCase',
    useClass: UpdateInstrumentUseCase,
}; 