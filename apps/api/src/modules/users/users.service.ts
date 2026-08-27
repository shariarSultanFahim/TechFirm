import {
  ConflictException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "./dto/create-user.dto";
import { QueryUserDto } from "./dto/query-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const existing = await this.userModel.findOne({ email: createUserDto.email.toLowerCase() });
    if (existing) {
      throw new ConflictException("User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
      password: hashedPassword
    });

    return createdUser.save();
  }

  async findAll(query: QueryUserDto) {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = query;

    const filter: FilterQuery<UserDocument> = {};

    if (role) {
      filter.role = role;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 } as Record<string, 1 | -1>;

    const [users, total] = await Promise.all([
      this.userModel.find(filter).sort(sort).skip(skip).limit(limit).exec(),
      this.userModel.countDocuments(filter).exec()
    ]);

    const totalPage = Math.ceil(total / limit);

    return {
      data: users.map((u) => u.toJSON()),
      meta: {
        page,
        limit,
        total,
        totalPage
      }
    };
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
    return user;
  }

  async findByEmail(email: string, includePassword = false): Promise<UserDocument | null> {
    const query = this.userModel.findOne({ email: email.toLowerCase() });
    if (includePassword) {
      query.select("+password +refreshToken");
    }
    return query.exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.findById(id);

    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.role) {
      user.role = updateUserDto.role;
    }

    return user.save();
  }

  async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
    let hashedToken: string | undefined = undefined;
    if (refreshToken) {
      const salt = await bcrypt.genSalt(10);
      hashedToken = await bcrypt.hash(refreshToken, salt);
    }

    await this.userModel.findByIdAndUpdate(id, { refreshToken: hashedToken }).exec();
  }

  async remove(id: string): Promise<{ id: string }> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
    return { id };
  }
}
