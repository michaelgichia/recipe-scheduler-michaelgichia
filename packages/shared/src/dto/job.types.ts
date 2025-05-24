import { IsString, IsNotEmpty, IsOptional, IsObject } from "class-validator";

export class PushNotificationPayload {
  @IsString()
  @IsNotEmpty({ message: "Push token is required" })
  to!: string;

  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: "Body is required" })
  body!: string;

  @IsOptional()
  @IsObject()
  data?: Record<string, any>;
}
