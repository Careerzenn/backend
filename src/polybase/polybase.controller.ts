import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PolybaseService, Profile } from './polybase.service';

@Controller('polybase')
export class PolybaseController {
  constructor(private readonly svc: PolybaseService) {}

  @Get(':address')
  async getProfile(@Param('address') address: string) {
    const result = await this.svc.getProfileByAddress(address);
    console.log(result);
    if (!result.status) throw new NotFoundException(result.message);
    return result;
  }

  @Post('/create')
  async createProfile(@Body() formData: Profile) {
    const result = await this.svc.createProfile(formData);
    console.log(result);
    if (!result.status) throw new BadRequestException(result.message);
    return result;
  }
}
