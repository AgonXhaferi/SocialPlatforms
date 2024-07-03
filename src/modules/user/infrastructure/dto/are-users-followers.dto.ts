export interface AreUsersFollowersDto {
  //TODO: I think we could just the query from the interface layer directly here,
  //TODO: Buuuuuut keep in mind its not bad to have DTO's for each layer, since the infrastructure layer shouldn't know about the interface layer.
  followerId: string;
  followeeId: string;
}
