import { Container } from "typedi";

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
