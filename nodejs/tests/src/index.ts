import {
	dag,
	Container,
	Directory,
	object,
	func,
	argument,
} from "@dagger.io/dagger";
import { expect, test } from "bun:test";

@object()
class Tests {
	/**
	 * Run Integration Tests
	 */
	@func()
	async testBun(@argument({ defaultPath: "./bun" }) directory: Directory) {
		const testContainer = dag
			.nodejs()
			.withBun(directory)
			.withExec(["bun", "install"]);

		// Test that everything works
		const nodeModules = await testContainer.directory("node_modules").entries();

		expect(nodeModules.length).toBeGreaterThan(1);

		// Test that our node_modules directory is a cacheVolume
		const cacheVolumeOutput = await testContainer
			.withExec(["bash", "-c", "mount | grep node_modules | wc -l"])
			.stdout();

		// We should get exactly one line of output that matches node_modules
		expect(cacheVolumeOutput.trim()).toBe("1");
	}
}
