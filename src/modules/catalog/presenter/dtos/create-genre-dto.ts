import { IsNotEmpty, IsString } from "class-validator";

export class CreateGenreDTO {

    @IsString()
    @IsNotEmpty()
    name: string;
} 