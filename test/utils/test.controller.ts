import { Controller, Delete, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class TestController {
  @Get('')
  findAll(@Res() res: Response): Promise<void> {
    return res.inertia.render('Users/AllUser', {
      users: [{
        id: 1,
        name: 'John Doe'
      }]
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    res.inertia.share({
      isLoggedIn: true
    });
    return res.inertia.render('Users/DetailUser', {
      id: +id,
      name: 'John Doe'
    });
  }

  @Delete(':id')
  remove(@Res() res: Response) {
    return res.inertia.redirect('/user');
  }
}