import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { routesV1 } from '@config/app.routes';

@ApiTags('Auth')
@Controller({
  version: routesV1.version,
  path: routesV1.auth.root,
})
export class AuthHttpController {}
