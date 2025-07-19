import { Module } from "@nestjs/common";
import { Music } from "../domain/entity/music-entity";
import { MusicController } from "../presenter/controllers/music.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { CreateMusicUseCaseProvider } from "./providers/create.music-usecase-provider";
import { MusicDomainProvider } from "./providers/music.domain.provider";
import { Genre } from "../domain/entity/genre-entity";
import { UpdateMusicUseCaseProvider } from "./providers/update.music-usecase-provider";

@Module({
    imports: [
        TypeOrmModule.forFeature([Music, Genre]),
        //Configuração do JWT neste módulo
        JwtModule.register({
            // Torna o JWT global, ou seja, disponível para todos os módulos sem a necessidade de importação
            global: true,
            // Chave secreta para assinar os tokens
            secret: process.env.JWT_SECRET,
            // Configurações de assinatura dos tokens. Neste caso, eu defino o tempo de expiração do token
            signOptions: { expiresIn: '1h' },
        }),
        ConfigModule.forRoot(),
    ],
    controllers: [MusicController],
    providers: [
        CreateMusicUseCaseProvider,
        MusicDomainProvider,
        UpdateMusicUseCaseProvider,
    ],
}) export class MusicModule {}