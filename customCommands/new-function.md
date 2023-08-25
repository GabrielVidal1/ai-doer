# Context

```
export type Command = {
name: string;
exec: (args: string[]) => string | Promise<string>;
};
```

for example src/business/commands/services/readFile.ts :

```
/readFile src/business/commands/services/readFile.ts
```

Write the file src/business/commands/services/command.ts with the following elements :

const COMMAND_FOLDERS = "./commands";

const COMMANDS = // Look for all the ".md" files in the COMMAND_FOLDERS folder

- the command name is "/command"

const exec = (args: string[]) => {
const command = args[0];
const commandFile = `${COMMAND_FOLDERS}/${command}.md`;
return readFile(commandFile);
};

- add error handling and return the error message

* don't forget the export default shown in readFile.ts

> think

> writeFile src/business/commands/services/command.ts

Edit the file src/business/commands/index.ts to add the new command

```
/readFile src/business/commands/index.ts
```

> writeFile src/business/commands/index.ts
