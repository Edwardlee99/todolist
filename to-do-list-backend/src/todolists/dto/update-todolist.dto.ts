// import { PartialType } from '@nestjs/mapped-types';
// import { CreateTodolistDto } from './create-todolist.dto';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTodolistDto {
    
    @IsString()
    public title: string;
    @IsString()
    @IsOptional()
    public description? : string;
    @IsEnum(["pending", "completed"], {message: "status must be required"})
    public status : "pending" | "completed";
    @IsNotEmpty()
    public updated_at: string;
}
