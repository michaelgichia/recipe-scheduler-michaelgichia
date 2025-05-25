import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  Device,
  MESSAGE_PATTERNS,
  CreateDeviceDto,
} from '@microservice/shared';
@Controller('devices')
export class DeviceController {
  constructor(@Inject('EVENT_SERVICE') private deviceService: ClientProxy) {}

  @Post()
  async createDevice(
    @Body() createDeviceDto: CreateDeviceDto,
  ): Promise<Device> {
    const result = await firstValueFrom(
      this.deviceService.send<{
        success: boolean;
        error?: string;
        data: Device;
      }>(MESSAGE_PATTERNS.CREATE_DEVICE, createDeviceDto),
    );

    if (!result.success) {
      throw new HttpException(
        result.error || 'Failed to create device',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result.data;
  }

  @Get(':id')
  async getDevice(@Param('id') id: string): Promise<Device> {
    const result = await firstValueFrom(
      this.deviceService.send<{
        success: boolean;
        error?: string;
        data: Device;
      }>(MESSAGE_PATTERNS.GET_DEVICE, id),
    );

    if (!result.success) {
      throw new HttpException(
        result.error || 'Failed to get event.',
        result.error === 'Device not found'
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    }

    return result.data;
  }
}
