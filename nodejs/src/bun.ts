import {
	dag,
	Container,
	Directory,
	object,
	func,
	CacheSharingMode,
} from "@dagger.io/dagger";

@object()
class Bun {
	private readonly version: string = "latest";

	constructor(version: string) {
		this.version = version;
	}

	/**
	 * Install JavaScript/Typescript dependencies using bun.
	 */
	@func()
	async install(directory: Directory): Promise<Container> {
		const packageJson = directory.file("package.json");
		const workingDirectory = "/code";
		const packageName = `${
			JSON.parse(await packageJson.contents()).name as string
		}-bun-modules`;

		return dag
			.container()
			.from(`oven/bun:${this.version}`)
			.withMountedDirectory(workingDirectory, directory)
			.withWorkdir(workingDirectory)
			.withMountedCache("/node_modules", dag.cacheVolume(packageName), {
				sharing: CacheSharingMode.Shared,
			})
			.withExec(["bun", "install"]);
	}
}
