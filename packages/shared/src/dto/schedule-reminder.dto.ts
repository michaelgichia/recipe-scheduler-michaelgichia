import { IsUUID, IsNumber, IsString, IsNotEmpty } from "class-validator";

export class ScheduleReminderDto {
  @IsUUID()
  eventId!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  eventTitle!: string;

  @IsString()
  @IsNotEmpty()
  eventTime!: string;

  @IsNumber()
  minutesBefore!: number;
}
