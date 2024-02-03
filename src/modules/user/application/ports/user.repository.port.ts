import { AggregateID, RepositoryPort } from '@libs/ddd';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

//This should not be the persistence/database entity, this should be the aggregate entity.
export interface UserRepositoryPort
  extends RepositoryPort<UserEntity, AggregateID> {}
