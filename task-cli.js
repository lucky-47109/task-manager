#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Ensure tasks.json exists
if (!fs.existsSync(TASKS_FILE)) {
  fs.writeFileSync(TASKS_FILE, '[]', 'utf8');
}

// Helper to get formatted date (YYYY-MM-DD HH:MM:SS)
function getFormattedDate() {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

// Read and write helpers
function readTasks() {
  return JSON.parse(fs.readFileSync(TASKS_FILE, 'utf8'));
}
function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

// Unique ID generator
function getNextId(tasks) {
  let maxId = 0;
  for (const task of tasks) if (task.id > maxId) maxId = task.id;
  return maxId + 1;
}

// Show help table
function help() {
  const cmds = [
    { Command: 'add "<desc>"', Description: 'Add a new task' },
    { Command: 'update <id> "<desc>"', Description: 'Update a task description' },
    { Command: 'delete <id>', Description: 'Delete a task' },
    { Command: 'mark-in-progress <id>', Description: 'Mark task as in progress' },
    { Command: 'mark-done <id>', Description: 'Mark task as done' },
    { Command: 'list', Description: 'List all tasks' },
    { Command: 'list done', Description: 'List done tasks' },
    { Command: 'list todo', Description: 'List todo tasks' },
    { Command: 'list in-progress', Description: 'List in-progress tasks' },
    { Command: 'help', Description: 'Show this help table' },
  ];
  console.table(cmds);
}

// Parse CLI arguments
const cmd = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (cmd) {
  case 'add':
    if (!arg1) {
      console.log('Description is required!');
      help();
      break;
    }
    {
      const tasks = readTasks();
      const newTask = {
        id: getNextId(tasks),
        description: arg1,
        status: 'todo',
        createdAt: getFormattedDate(),
        updatedAt: getFormattedDate(),
      };
      tasks.push(newTask);
      writeTasks(tasks);
      console.log(`Task added successfully (ID: ${newTask.id})`);
    }
    break;

  case 'update':
    if (!arg1 || !arg2) {
      console.log('Usage: update <id> "<description>"');
      help();
      break;
    }
    {
      const tasks = readTasks();
      const task = tasks.find(t => t.id === Number(arg1));
      if (!task) {
        console.log('Task not found!');
        break;
      }
      task.description = arg2;
      task.updatedAt = getFormattedDate();
      writeTasks(tasks);
      console.log('Task updated.');
    }
    break;

  case 'delete':
    if (!arg1) {
      console.log('Usage: delete <id>');
      help();
      break;
    }
    {
      let tasks = readTasks();
      const n = tasks.length;
      tasks = tasks.filter(t => t.id !== Number(arg1));
      if (tasks.length === n) {
        console.log('Task not found!');
        break;
      }
      writeTasks(tasks);
      console.log('Task deleted.');
    }
    break;

  case 'mark-in-progress':
    if (!arg1) {
      console.log('Usage: mark-in-progress <id>');
      help();
      break;
    }
    {
      const tasks = readTasks();
      const task = tasks.find(t => t.id === Number(arg1));
      if (!task) {
        console.log('Task not found!');
        break;
      }
      task.status = 'in-progress';
      task.updatedAt = getFormattedDate();
      writeTasks(tasks);
      console.log('Task marked as in progress.');
    }
    break;

  case 'mark-done':
    if (!arg1) {
      console.log('Usage: mark-done <id>');
      help();
      break;
    }
    {
      const tasks = readTasks();
      const task = tasks.find(t => t.id === Number(arg1));
      if (!task) {
        console.log('Task not found!');
        break;
      }
      task.status = 'done';
      task.updatedAt = getFormattedDate();
      writeTasks(tasks);
      console.log('Task marked as done.');
    }
    break;

  case 'list':
    {
      const status = arg1;
      const tasks = readTasks();
      let filtered = tasks;
      if (status === 'done' || status === 'todo' || status === 'in-progress') {
        filtered = tasks.filter(t => t.status === status);
      }
      if (filtered.length === 0) {
        console.log('No tasks found.');
      } else {
        // Show fields with formatted dates
        const table = filtered.map(t => ({
          ID: t.id,
          Description: t.description,
          Status: t.status,
          CreatedAt: (t.createdAt || '').replace('T', ' ').substring(0, 19),
          UpdatedAt: (t.updatedAt || '').replace('T', ' ').substring(0, 19),
        }));
        console.table(table);
      }
    }
    break;

  case 'help':
    help();
    break;

  default:
    help();
    break;
}
