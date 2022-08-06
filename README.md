# nestjs-inertia
`nestjs-inertia` is a simple [NestJS](https://nestjs.com) adapter/middleware with `express-platform` for [Inertia.js](https://inertiajs.com) to create server-driven single page applications.

## Installation
You can run command below to install `nestjs-inertia` to your NestJS project.

```
npm i nestjs-inertia
```

## Applying adapter
Based on official NestJS documentation of their middleware, you can apply `nestjs-inertia` middleware to global or module level like below:

1. Global Level
    ```ts
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { inertiaMiddleware } from 'nestjs-inertia'

    const app = await NestFactory.create(AppModule);
    app.use(inertiaMiddleware);
    await app.listen(3000);
    ```
2. Module Level
    ```ts
    import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { InertiaMiddleware } from 'nestjs-inertia'

    @Module({
      imports: [],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule implements NestModule {
      configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(InertiaMiddleware)
          .forRoutes('*');
      }
    }
    ```

## Usage
You can use this adapter from express' `Response` api.

### Basic Usage

- Rendering a component
  ```ts
  res.inertia.render('Users/AllUser', {
    users: [
      {
        id: 1,
        name: 'John Doe'
      }
    ]
  });
  ```
- Share data
  ```ts
  res.inertia.share({
    isLoggedIn: true
  });
  ```
- Redirection
  ```ts
  res.inertia.redirect('/user');
  ```

### Example usage at controller
```ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UserController {
  @Get()
  findAll(@Res() res: Response): Promise<void> {
    return res.inertia.render('Users/AllUser', {
      users: [
        {
          id: 1,
          name: 'John Doe'
        }
      ]
    });
  }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)