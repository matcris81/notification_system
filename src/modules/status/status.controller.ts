import { Controller, Get, Param, Render } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}
  
  @Get()
  @Render('status')
  test() {}

  @Get(':id')
  @Render('status')
  root(@Param('id') id: string) {
    console.log('Accessing /status/:id with id:', id);
    return { id }; // Pass the id to the template
  }
}
