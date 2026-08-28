import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { ContactMessagesModule } from "./modules/contact-messages/contact-messages.module";
import { FaqsModule } from "./modules/faqs/faqs.module";
import { PlansModule } from "./modules/plans/plans.module";
import { PortfolioModule } from "./modules/portfolio/portfolio.module";
import { PostsModule } from "./modules/posts/posts.module";
import { SiteConfigModule } from "./modules/site-config/site-config.module";
import { TeamModule } from "./modules/team/team.module";
import { TestimonialsModule } from "./modules/testimonials/testimonials.module";
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
        const uri = configService.get<string>("MONGODB_URI");
        if (!uri) {
          throw new Error("MONGODB_URI environment variable is required.");
        }
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
    PortfolioModule,
    ContactMessagesModule,
    SiteConfigModule,
    TestimonialsModule,
    FaqsModule,
    TeamModule
  ]
})
export class AppModule {}
