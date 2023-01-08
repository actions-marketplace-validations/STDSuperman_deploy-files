import * as core from '@actions/core'
import { ScpClient } from './lib/scp-client';

export async function run(): Promise<boolean> {
  try {
    const host: string = core.getInput('host')
    const username: string = core.getInput('user')
    const password: string = core.getInput('password')
    const sourcePath: string = core.getInput('sourcePath')
    const targetPath: string = core.getInput('targetPath')
    const commands: any = core.getInput('commands')

    const scpClient = new ScpClient({
      host,
      port: 22,
      username,
      password,
    })

    console.log('start upload files...')
    console.log('commands', commands, typeof commands, commands?.split('\n*\t*'));

    await scpClient.waitForReady();
    await scpClient.uploadDirectory(sourcePath, targetPath)

    console.log('upload success!')

    await scpClient.close();

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      core.setFailed(error.message)
    }
  }
  return false;
}

run()