import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty({ name: 'title' })
    title: string;
    
    @ApiProperty({ name: 'description' })
    description: string;
}
