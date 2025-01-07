# CLI Task Timer Website

This project is a web application that showcases a CLI-based Task Timer implemented in three different programming languages: Python, C#, and JavaScript. The website allows users to explore and interact with the Task Timer application in their preferred language. It demonstrates the same functionality across each language, highlighting both versatility and ease of use. 

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Classes and Methods](#classes-and-methods)
  - [TaskTimer](#tasktimer)
  - [AllTimers](#alltimers)
- [Technology Used](#technology-used)
- [About Us](#about-us)

## Project Description

The CLI Task Timer allows users to manage multiple timers through a command-line interface, with functionality to start, pause, reset, and retrieve elapsed time for each timer. Users can select Python, C#, or JavaScript to interact with the timer on the website, which provides a consistent experience across all three languages.

The website is built with a modern tech stack and designed to showcase the power of command-line interfaces while giving users a hands-on experience with task timers across different languages and environments.

## Features

- **Multilanguage Timer Interface**: Choose between Python, C#, and JavaScript implementations of the Task Timer.
- **Command-Line Interaction**: Test commands directly in the CLI environment.
- **Task Management**: Start, pause, reset, and retrieve timer status or elapsed time.
- **Real-Time Updates**: Displays current status and elapsed time of tasks in real-time.

## Classes and Methods

### TaskTimer

The `TaskTimer` class provides the core functionality for managing individual timers. Each timer can start, pause, reset, and retrieve details of elapsed time and status.

#### Methods

- `start()`: Starts or resumes the timer.
- `pause()`: Pauses the timer.
- `reset()`: Resets the timer to zero.
- `getStatus()`: Returns the current status of the timer (e.g., running, paused).
- `getElapsedTime()`: Retrieves the total time elapsed since the timer was started.
- `getUid()`: Generates and returns a unique identifier for each timer instance.

### AllTimers

The `AllTimers` class is a manager for multiple `TaskTimer` instances, enabling users to manage multiple timers at once.

#### Methods

- `createTimer(name)`: Creates a new timer instance with the specified name.
- `startTimer(name)`: Starts or resumes the timer specified by name.
- `pauseTimer(name)`: Pauses the timer specified by name.
- `resetTimer(name)`: Resets the timer specified by name to zero.
- `getStatusTimer(name)`: Returns the status of the specified timer.
- `getElapsedTimeTimer(name)`: Retrieves the elapsed time for the specified timer.
- `getUidTimer(name)`: Returns the unique identifier of the specified timer.

## Technology Used

- **Frontend**: React, for an interactive and dynamic user interface.
- **Backend**:
  - **JavaScript**: Node.js for the JavaScript version of the CLI Task Timer.
  - **C#**: .NET for the C# version, handling CLI commands within the application.
  - **Python**: Flask for the Python version of the CLI, providing a robust framework for backend logic.
    
For a step by step guide on how to build and run the backend for a specific language, follow the README.md file from the repositories bellow:
- **JavaScript**: https://github.com/hasagi33/CLI_Task_JS
- **C#**: https://github.com/hasagi33/CLI_Task_Cs
- **Python**: https://github.com/hasagi33/CLI_Task_Py
## About Us

Created by a team of 3 students to showcase differences between different programming languages and architectures.
