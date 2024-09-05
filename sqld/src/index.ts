import { dag, object, func, Service } from "@dagger.io/dagger";

@object()
class Sqld {
	/**
	 * Run a sqld server
	 */
	@func()
	run(port: number = 8080): Service {
		return dag
			.container()
			.from("ghcr.io/tursodatabase/libsql-server:latest")
			.withExposedPort(port)
			.withExec([
				"sqld",
				"--enable-http-console",
				"--http-listen-addr",
				`0.0.0.0:${port}`,
			])
			.asService();
	}
}
