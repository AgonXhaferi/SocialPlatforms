import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'Mike',
    description: 'First name of the user',
  })
  @MaxLength(320)
  @MinLength(1)
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Jefferson',
    description: 'Last name of the user',
  })
  @MaxLength(320)
  @MinLength(1)
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    example: 'aguon_',
    description: 'Username of the user',
  })
  @MaxLength(320)
  @MinLength(3)
  @IsString()
  readonly userName: string;

  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '24',
    description: 'Age of the user',
  })
  @IsNumber()
  readonly age: number;

  @ApiProperty({ example: 'France', description: 'Country of residence' })
  @MaxLength(50)
  @MinLength(4)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly country: string;

  @ApiProperty({ example: '28566', description: 'Postal code' })
  @MaxLength(10)
  @MinLength(4)
  @IsAlphanumeric()
  readonly postalCode: string;

  @ApiProperty({ example: 'Grande Rue', description: 'Street' })
  @MaxLength(50)
  @MinLength(5)
  @Matches(/^[a-zA-Z ]*$/)
  readonly street: string;
}
