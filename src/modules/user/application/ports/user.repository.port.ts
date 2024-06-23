import { AggregateID, RepositoryPort } from '@libs/ddd';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

export interface UserRepositoryPort
  extends RepositoryPort<UserEntity, AggregateID> {
  findUsersByIds(userIds: string[]): Promise<UserEntity[]>;
}
