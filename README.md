
 # task-manager

A simple command-line task management tool written in Node.js. This CLI app allows you to add, update, delete, and track tasks with different statuses such as todo, in-progress, and done. Tasks are stored persistently in a JSON file.

## Features

- Add new tasks with descriptions
- Update existing task descriptions
- Delete tasks by ID
- Mark tasks as in progress or done
- List all tasks or filter by status (todo, in-progress, done)
- Simple and easy-to-use CLI commands
- Persistent storage using a local JSON file

## Installation

Make sure you have [Node.js](https://nodejs.org/) installed. Then clone this repository and install dependencies if any (this script has no external dependencies):

```bash
git clone <repository-url>
cd <project-directory>
```

## Usage

Run the task manager CLI with Node.js:

```bash
node task-cli.js <command> [arguments]
```

### Commands

| Command           | Arguments           | Description                    |
|-------------------|---------------------|--------------------------------|
| `add`             | `description`       | Add a new task                  |
| `update`          | `id` `description`  | Update a task description       |
| `delete`          | `id`                | Delete a task                   |
| `mark-in-progress` | `id`                | Mark a task as in progress      |
| `mark-done`       | `id`                | Mark a task as done             |
| `list`            | `[status]`          | List all or filter by status    |
| `help`            |                     | Show help table with commands   |

### Examples

Add a new task:

```bash
node task-cli.js add "Finish writing README"
```

Update a task description:

```bash
node task-cli.js update 1 "Update README with project details"
```

Mark a task done:

```bash
node task-cli.js mark-done 1
```

List all tasks:

```bash
node task-cli.js list
```

List tasks with status "todo":

```bash
node task-cli.js list todo
```

## Data Storage

Tasks are stored in a `tasks.json` file in the same directory. The app automatically creates this file if it does not exist.




