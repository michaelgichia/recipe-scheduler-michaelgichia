import {
  IsString,
  IsUUID,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsISO8601,
  ValidateIf,
  IsNumberString,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";

// Event DTOs

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  @MaxLength(200, { message: "Title too long" })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: "User ID is required" })
  @IsUUID("4", { message: "Invalid user ID format" })
  userId!: string;

  @IsString()
  @IsNotEmpty({ message: "Event time is required" })
  @IsISO8601({}, { message: "Invalid datetime format" })
  eventTime!: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  @MaxLength(200, { message: "Title too long" })
  title?: string;

  @IsOptional()
  @IsString()
  @IsISO8601({}, { message: "Invalid datetime format" })
  eventTime?: string;

  // Custom validation: ensure at least one of `title` or `eventTime` is provided
  @ValidateIf((o) => !o.title && !o.eventTime)
  @IsNotEmpty({
    message: "At least one field (title or eventTime) must be provided",
  })
  dummyFieldForValidation?: string;
}

export class EventParams {
  @IsUUID("4", { message: "Invalid event ID format" })
  id!: string;
}

export class GetEventsQuery {
  @IsUUID("4", { message: "Invalid user ID format" })
  userId!: string;

  @IsOptional()
  @IsNumberString({}, { message: "Limit must be a number" })
  limit?: string;

  @IsOptional()
  @IsNumberString({}, { message: "Offset must be a number" })
  offset?: string;
}
