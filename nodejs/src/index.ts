import {
  dag,
  object,
  func,
  Directory,
  Container,
  CacheSharingMode,
} from "@dagger.io/dagger";

// I tried to make this fancy, but we ran into some problems
// with Dagger.
// Revisit this when:
//   - https://github.com/dagger/dagger/issues/8343
//   - https://github.com/dagger/dagger/issues/8344

@object()
class nodejs {
  @func()
  async withBun(
    directory: Directory,
    version: string = "latest"
  ): Promise<Container> {
    console.log(`Searching for package.json`);
    const packageJson = directory.file("package.json");
    console.log(`Found. Finding cacheVolumeName ...`);
    const cacheVolumeName = `${
      JSON.parse(await packageJson.contents()).name as string
    }-bun-modules`;
    console.log(`Found: ${cacheVolumeName}`);

    return dag
      .container()
      .from(`oven/bun:${version}`)
      .withMountedCache("/node_modules", dag.cacheVolume(cacheVolumeName), {
        sharing: CacheSharingMode.Shared,
      })
      .withEntrypoint(["bun"])
      .withMountedDirectory("/code", directory)
      .withWorkdir("/code");
  }

  @func()
  async withNPM(
    directory: Directory,
    version: string = "latest"
  ): Promise<Container> {
    const packageJson = directory.file("package.json");
    const cacheVolumeName = `${
      JSON.parse(await packageJson.contents()).name as string
    }-npm-modules`;

    return dag
      .container()
      .from(`node:${version}`)
      .withMountedCache("/node_modules", dag.cacheVolume(cacheVolumeName), {
        sharing: CacheSharingMode.Shared,
      })
      .withEntrypoint(["npm"])
      .withMountedDirectory("/code", directory)
      .withWorkdir("/code");
  }
}
