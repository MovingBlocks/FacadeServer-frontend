// Tab completion engine for autocompleting commands. Inspired by the TabCompletionEngine class
// for the Terasology in-game console.

export class ConsoleAutocomplete {

  // the matches currently found
  private static matches: string[] = [];
  // the index of the current match
  private static matchIndex: number = 0;
  // the commands entered before this one
  private static previousCommands: string[] = [];
  // a list of commands given by the REST API for console GET
  private static commandList: string[] = [];

  // autocomplete the command.
  public static complete(command: string): string {
    this.previousCommands.push(command);
    // if command was not entered, display some help text
    if (command.length <= 0) {
      return "Type 'help' to list all commands.";
    }
    // if no commands were previously entered, find a list of commands
    if (this.previousCommands.length === 1) {
      this.findMatches(command);
    }
    // if matches were found, do nothing to the command
    if (this.matches.length === 0) {
      return command;
    } else if (this.matches.length === 1) {
      return this.matches[0];
    }
    // If the last possible match has already been iterated through, reset the index to the first location.
    if (this.matchIndex + 1 === this.matches.length) {
      this.matchIndex = -1;
    }
    // If there is more than one match (as required by the if/else statement above)
    // and this is not the first command entered, then cycle through the matches.
    if (this.previousCommands.length !== 1) {
      ++this.matchIndex;
    }
    return this.matches[this.matchIndex];
  }

  // reset the state of autocompletion
  public static clear() {
    this.matches = [];
    this.matchIndex = 0;
    this.previousCommands = [];
  }

  // set the list of commands provided by the backend
  public static setCommandList(commands: string[]) {
    if (this.commandList.length === 0) {
      this.commandList = commands.sort();
    }
  }

  // find the possible matches of the given command, using the command list provided by the REST API
  private static findMatches(command: string): void {
    this.matches = this.commandList.filter((cmd) => cmd.indexOf(command) === 0);
  }

}
