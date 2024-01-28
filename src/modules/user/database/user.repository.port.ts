import { RepositoryPort } from '@libs/ddd';
import { UserPersistenceEntity } from '@modules/user/domain/entities/user.persistence.entity';

//This should not be the persistence/database entity, this should be the aggregate entity.
export interface UserRepositoryPort
  extends RepositoryPort<UserPersistenceEntity> {}
