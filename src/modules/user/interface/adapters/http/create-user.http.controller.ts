import { Controller } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';

@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor() {}
}
