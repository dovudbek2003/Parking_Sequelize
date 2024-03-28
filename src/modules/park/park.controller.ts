import { Controller, Get, Post, Body, Put, Param, Delete, Inject } from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ApiTags } from '@nestjs/swagger';
import { IParkService } from './interfaces/park.service';

@ApiTags('parks')
@Controller('park')
export class ParkController {
  constructor(@Inject('IParkService') private readonly parkService: IParkService) { }

  @Post()
  create(@Body() createParkDto: CreateParkDto) {
    return this.parkService.create(createParkDto);
  }

  @Get()
  findAll() {
    return this.parkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateParkDto: UpdateParkDto) {
    return this.parkService.update(+id, updateParkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkService.remove(+id);
  }
}
