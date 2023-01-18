import { Controller, Get, } from '@nestjs/common';
import { DateService } from './date.service';
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Get('/findAllDays')
  @Auth( /**  N Permissions */ )
  findAllDays() {
    return this.dateService.findAllDays();
  }

}
