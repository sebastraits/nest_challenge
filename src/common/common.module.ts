import { Module } from '@nestjs/common';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [SwaggerModule],
})
export class CommonModule {}
