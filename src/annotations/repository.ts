import { Container } from "typedi";
import { SpotifyRepository } from "../repositories/Repositories/Spotify/SpotifyRepository";

export function RepositoryMongo() {
  return function(object: Object, propertyName: string, index?: number) {
    const repositoryName =
      propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
    const repository = Container.get(repositoryName);
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: containerInstance => repository
    });
  };
}

export function RepositoryFirebase() {
  return function(object: Object, propertyName: string, index?: number) {
    const repositoryName =
      propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
    const repository = Container.get(repositoryName);
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: containerInstance => repository
    });
  };
}

export function RepositorySpotify() {
  return function(object: Object, propertyName: string, index?: number) {
    const repository = new SpotifyRepository();
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: containerInstance => repository
    });
  };
}
