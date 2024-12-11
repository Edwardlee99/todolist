import {IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateTodolistDto {
    @IsString()
    @IsNotEmpty()
    public title: string;
    @IsString()
    @IsOptional()
    public description : string;
    @IsNotEmpty()
    public created_at: string;
    @IsNotEmpty()
    public updated_at: string;
}
