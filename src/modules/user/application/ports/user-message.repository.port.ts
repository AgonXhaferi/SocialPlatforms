import { AggregateID, RepositoryPort } from '@libs/ddd';
import { UserMessageEntity } from '@modules/user/domain/entities/user-message.entity';

export interface UserMessageRepositoryPort
  extends RepositoryPort<UserMessageEntity, AggregateID> {
  findByShipmentId(id: string): Promise<UserMessageEntity[]>;
}
