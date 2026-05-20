# Example for Blockly Pygame Zero (TypeScript)

This directory contains a working example of how to use the Blockly Pygame Zero (TypeScript) library. Follow the instructions below to run this example and see the blocks in action.

## Getting Started

1. **Navigate to the example directory:**
   ```bash
   cd example
   ```

2. **Install Dependencies:**
   ```bash
   bun install
   ```
   This will install all the necessary packages for the example.

3. **Run the Example Application:**
   ```bash
   bun run index.ts
   ```
   This command will start a local development server and open the example in your web browser. You can then interact with the Blockly workspace and see the Pygame Zero blocks generate code.

## Project Structure

- `index.html`: The main HTML file that loads Blockly and the Pygame Zero blocks.
- `index.ts`: The TypeScript file that initializes Blockly, defines the workspace, and handles code generation and execution.
- `blocks.ts`: Defines the custom Blockly blocks for Pygame Zero.
- `generators.ts`: Contains the code generators for the Pygame Zero blocks.
- `msg.ts`: Internationalization messages for the blocks.
