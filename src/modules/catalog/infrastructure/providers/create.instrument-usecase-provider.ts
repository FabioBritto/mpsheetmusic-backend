import { CreateInstrumentUseCase } from "../../application/use-cases/create.instrument-usecase";

export const CreateInstrumentUseCaseProvider = {
    provide: 'CreateInstrumentUseCase',
    useClass: CreateInstrumentUseCase,
}; 