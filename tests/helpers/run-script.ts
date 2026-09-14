import { execFile, type ExecFileOptionsWithStringEncoding } from 'node:child_process';
import { createRequire } from 'node:module';
import { promisify } from 'node:util';

const run = promisify(execFile);
const tsxCli = createRequire(import.meta.url).resolve('tsx/cli');

export function runScript(
  scriptPath: string,
  args: string[],
  options: ExecFileOptionsWithStringEncoding,
) {
  return run(process.execPath, [tsxCli, scriptPath, ...args], { ...options, shell: false });
}
