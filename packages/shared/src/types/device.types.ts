export interface Device {
  id: string;
  userId: string;
  pushToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDeviceRequest {
  userId: string;
  pushToken: string;
}
