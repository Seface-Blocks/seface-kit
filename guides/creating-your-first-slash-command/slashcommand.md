---
description: Interface
---

# SlashCommand

| Property       | Type                   | Description                                                                                                                                           |
| -------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| name           | string                 | The name of the command. **Optional: **✕                                                                                                              |
| description    | string                 | <p>The description of the command.</p><p><strong>Optional:</strong> ✕</p>                                                                             |
| isSlashCommand | boolean                | <p>If true, the command will be marked as slash command. </p><p><strong>Optional: </strong>✔</p>                                                      |
| ignoreRegister | boolean                | <p>If true, the command will not be registered.</p><p><strong>Optional: </strong>✔</p>                                                                |
| options        | SlashCommandOptions\[] | <p>The options of the command.</p><p><strong>Optional: </strong>✔</p>                                                                                 |
| guild          | string\[] or string    | <p>The guild(s) the command should be registered with. If left empty, the command will be registered globally.</p><p><strong>Optional: </strong>✔</p> |
| execute        | SlashCommandExecutor   | <p>The main function of the command.</p><p><strong>Optional: </strong>✕</p>                                                                           |
