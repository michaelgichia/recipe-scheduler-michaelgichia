import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  ApiResponse,
  CreateDeviceDto,
  Device,
  MESSAGE_PATTERNS,
} from '@microservice/shared';

import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesProcessor {
  constructor(private readonly devicesService: DevicesService) {}

  @MessagePattern(MESSAGE_PATTERNS.CREATE_DEVICE)
  async createDevice(
    createDeviceDto: CreateDeviceDto,
  ): Promise<ApiResponse<Device>> {
    return this.devicesService.create(createDeviceDto);
  }

  @MessagePattern(MESSAGE_PATTERNS.GET_DEVICE)
  async getDevice(id: string): Promise<ApiResponse<Device | null>> {
    return this.devicesService.findOne(id);
  }

  @MessagePattern(MESSAGE_PATTERNS.GET_DEVICE_BY_USER_ID)
  async findPushTokensByUserId(
    userId: string,
  ): Promise<ApiResponse<Device | null>> {
    return this.devicesService.findPushTokensByUserId(userId);
  }
}
