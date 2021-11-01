---
description: Interface
---

# PrefixCommand

| Property       | Type                  | Description                                                                                      |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------ |
| name           | string                | The name of the command. **Optional: **✕                                                         |
| description    | string                | <p>The description of the command.</p><p><strong>Optional:</strong> ✕</p>                        |
| isSlashCommand | boolean               | <p>If true, the command will be marked as slash command. </p><p><strong>Optional: </strong>✔</p> |
| ignoreRegister | boolean               | <p>If true, the command will not be registered.</p><p><strong>Optional: </strong>✔</p>           |
| aliases        | string\[]             | <p>The aliases of the command.</p><p><strong>Optional: </strong>✔</p>                            |
| execute        | PrefixCommandExecutor | <p>The main function of the command.</p><p><strong>Optional: </strong>✕</p>                      |
