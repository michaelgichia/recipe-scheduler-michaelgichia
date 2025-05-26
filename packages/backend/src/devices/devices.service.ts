import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeviceDto, ApiResponse } from '@microservice/shared';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<ApiResponse<Device>> {
    try {
      const device = this.devicesRepository.create(createDeviceDto);
      const savedDevice = await this.devicesRepository.save(device);
      return {
        success: true,
        data: savedDevice,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Something wrong happened',
      };
    }
  }

  async findOne(id: string): Promise<ApiResponse<Device>> {
    try {
      const device = await this.devicesRepository.findOne({ where: { id } });
      if (!device) {
        return {
          success: false,
          error: `Device with ID "${id}" not found`,
        };
      }
      return {
        success: true,
        data: device,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Something wrong happened',
      };
    }
  }

  async findPushTokensByUserId(userId: string): Promise<ApiResponse<Device>> {
    try {
      const device = await this.devicesRepository.findOne({
        where: { userId },
      });
      if (!device) {
        return {
          success: false,
          error: `Device with User ID "${userId}" not found`,
        };
      }
      return {
        success: true,
        data: device,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Something wrong happened',
      };
    }
  }
}
