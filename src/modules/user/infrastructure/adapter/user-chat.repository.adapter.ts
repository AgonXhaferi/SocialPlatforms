import { UserChatRepositoryPort } from '@modules/user/application/ports/user-chat.repository.port';
import { Paginated, PaginatedQueryParams } from '@src/libs/ddd';
import { UserChatPersistenceEntity } from '../../database/entities/user-chat.persistence.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserChatMapper } from '@modules/user/mapper/user-chat.mapper';
import { UserChatEntity } from '../../domain/entities/user-chat.entity';
import { DoesChatExistDto } from '../dto/does-chat-exist.dto';

export class UserChatRepositoryAdapter implements UserChatRepositoryPort {
  constructor(
    @InjectRepository(UserChatPersistenceEntity)
    private readonly repository: Repository<UserChatPersistenceEntity>,
    private readonly mapper: UserChatMapper,
  ) {}

  async doesChatExist(doesChatExistDto: DoesChatExistDto): Promise<boolean> {
    const { userOneId, userTwoId } = doesChatExistDto;

    const doesChatExist = await this.repository
      .createQueryBuilder('chat')
      .where('(chat.userOne = :userOneId AND chat.userTwo = :userTwoId)', {
        userOneId,
        userTwoId,
      })
      .orWhere('(chat.userOne = :userTwoId AND chat.userTwo = :userOneId)', {
        userOneId,
        userTwoId,
      })
      .getOne();

    return !!doesChatExist;
  }

  async create(entity: UserChatEntity): Promise<string> {
    const persistenceEntity = this.mapper.toPersistence(entity);

    const newUserChatPersistenceEntity =
      await this.repository.save(persistenceEntity);

    return newUserChatPersistenceEntity.id;
  }

  createMany(entity: UserChatEntity[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findOneById(id: string): Promise<UserChatEntity> {
    const persistenceEntity = await this.repository.findOneBy({
      id,
    });

    return this.mapper.toDomain(persistenceEntity);
  }

  async findAll(): Promise<UserChatEntity[]> {
    const persistenceEntities = await this.repository.find();

    return persistenceEntities.map(this.mapper.toDomain);
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<UserChatEntity>> {
    throw new Error('Method not implemented.');
  }

  delete(entity: UserChatEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  transaction<T>(handler: () => Promise<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
