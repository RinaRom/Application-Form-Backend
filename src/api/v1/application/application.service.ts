import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepos: Repository<Application>,
  ) {}
  async create(createApplicationDto: CreateApplicationDto) {
    const createdForm = await this.applicationRepos
      .insert({
        name: createApplicationDto.name.trim(),
        last_name: createApplicationDto.last_name.trim(),
        phone: createApplicationDto.phone.trim(),
        email: createApplicationDto.email.trim(),
      })
      .catch((e) => {
        const logger = new Logger();
        logger.error(e.message);
        throw new InternalServerErrorException();
      });
    return {
      status: HttpStatus.CREATED,
      message: 'Application has been created',
      application: await this.applicationRepos.findOneBy({
        id: createdForm.identifiers[0].id,
      }),
    };
  }

  async findAll() {
    return await this.applicationRepos.find();
  }

  async findOne(id: number) {
    if (!Number.isFinite(id))
      throw new HttpException('Invalid application id', HttpStatus.BAD_REQUEST);
    const application = await this.applicationRepos.findOneBy({ id });
    if (!application) throw new NotFoundException();
    return application;
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto) {
    if (!Number.isFinite(id))
      throw new HttpException('Invalid application id', HttpStatus.BAD_REQUEST);
    const application = await this.applicationRepos.findOneBy({ id });
    if (!application) throw new NotFoundException();
    await this.applicationRepos
      .update(application, {
        name: updateApplicationDto.name.trim(),
        last_name: updateApplicationDto.last_name.trim(),
        phone: updateApplicationDto.phone.trim(),
        email: updateApplicationDto.email.trim(),
      })
      .catch((e) => {
        const logger = new Logger();
        logger.error(e.message);
        throw new InternalServerErrorException();
      });
    return {
      status: HttpStatus.OK,
      message: 'Application has been updated',
      application: await this.applicationRepos.findOneBy({
        id,
      }),
    };
  }

  async remove(id: number) {
    if (!Number.isFinite(id))
      throw new HttpException('Invalid application id', HttpStatus.BAD_REQUEST);
    const application = await this.applicationRepos.findOneBy({ id });
    if (!application) throw new NotFoundException();
    await this.applicationRepos.delete(application).catch((e) => {
      const logger = new Logger();
      logger.error(e.message);
      throw new InternalServerErrorException();
    });
    return {
      status: HttpStatus.OK,
      message: 'Application has been deleted',
    };
  }
}
