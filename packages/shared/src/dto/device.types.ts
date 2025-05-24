import { IsString, IsUUID, IsNotEmpty } from "class-validator";

// Device DTO

export class CreateDeviceDto {
  @IsUUID("4", { message: "Invalid user ID format" })
  userId!: string;

  @IsString()
  @IsNotEmpty({ message: "Push token is required" })
  pushToken!: string;
}
