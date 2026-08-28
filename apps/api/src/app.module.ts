import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { ContactMessagesModule } from "./modules/contact-messages/contact-messages.module";
import { PlansModule } from "./modules/plans/plans.module";
import { PostsModule } from "./modules/posts/posts.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri =
          configService.get<string>("MONGODB_URI") ||
          "mongodb://localhost:27017/fullstack_assessment_db";
        return {
          uri
        };
      },
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    PlansModule,
    PostsModule,
    ContactMessagesModule
  ]
})
export class AppModule {}
