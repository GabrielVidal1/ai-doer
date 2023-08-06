import child_process from 'child_process';

export const executeBashCommand = (
  instruction: string,
  spawnOpts = {},
  silenceOutput = true
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let errorData = '';

    const [command, ...args] = instruction.split(/\s+/);

    if (process.env.DEBUG_COMMANDS === 'true') {
      console.log(`Executing \`${instruction}\``);
      console.log('Command', command, 'Args', args);
    }

    const spawnedProcess = child_process.spawn(command, args, spawnOpts);

    let data = '';

    spawnedProcess.on('message', console.log);

    spawnedProcess.stdout.on('data', chunk => {
      if (!silenceOutput) {
        console.log(chunk.toString());
      }

      data += chunk.toString();
    });

    spawnedProcess.stderr.on('data', chunk => {
      errorData += chunk.toString();
    });

    spawnedProcess.on('close', function (code) {
      if (code > 0) {
        return reject(
          new Error(`${errorData} (Failed Instruction: ${instruction})`)
        );
      }

      resolve(data);
    });

    spawnedProcess.on('error', function (err) {
      reject(err);
    });
  });
};
