import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { ApiExceptionFilter } from "./common/filters/api-exception.filter";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Cookie Parser
  app.use(cookieParser());

  // Global Route Prefix
  const globalPrefix = "api/v1";
  app.setGlobalPrefix(globalPrefix);

  // Backward compatibility middleware: rewrite /api/* (without v1) to /api/v1/*
  app.use((req: any, _res: any, next: any) => {
    if (
      req.url &&
      req.url.startsWith("/api/") &&
      !req.url.startsWith("/api/v1/") &&
      !req.url.startsWith("/api/docs")
    ) {
      req.url = req.url.replace(/^\/api\//, "/api/v1/");
    }
    next();
  });

  // CORS Configuration via ConfigService
  const nodeEnv = configService.get<string>("NODE_ENV") || "development";
  const isDev = nodeEnv !== "production";

  const rawOrigins =
    configService.get<string>("ALLOWED_ORIGINS") || configService.get<string>("CORS_ORIGINS") || "";

  const allowedOrigins = rawOrigins
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        (isDev && (origin.includes("localhost") || origin.includes("127.0.0.1")))
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
  });

  // Global Interceptors & Filters
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: false
    })
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ApiExceptionFilter());

  // Swagger Documentation Setup
  const enableSwagger = isDev || configService.get<string>("ENABLE_API_DOCS") === "true";

  if (enableSwagger) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("Fullstack Assessment API")
      .setDescription(
        "NestJS + MongoDB REST API with RBAC authentication and cookie-based sessions."
      )
      .setVersion("1.0.0")
      .addBearerAuth()
      .addCookieAuth("accessToken", {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
        description: "JWT access token stored in httpOnly cookie"
      })
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    // Interactive Swagger UI at /api/docs
    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: {
        persistAuthorization: true
      },
      customSiteTitle: "API Documentation | Fullstack Assessment"
    });

    // Raw OpenAPI JSON spec at /api/docs.json
    app.getHttpAdapter().get("/api/docs.json", (_, res) => {
      res.json(document);
    });

    logger.log("📖 Swagger UI available at /api/docs");
    logger.log("📄 Raw OpenAPI Spec available at /api/docs.json");
  }

  const port = configService.get<number>("PORT") || 5000;
  await app.listen(port);
  logger.log(`🚀 NestJS API server running on port: ${port} (prefix: /${globalPrefix})`);
}

bootstrap();
