// Tab completion engine for autocompleting commands. Inspired by the TabCompletionEngine class
// for the Terasology in-game console.

export class ConsoleAutocomplete {

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
    }
    // If the last possible match has already been iterated through, reset the index to the first location.
    // The match index must be offset because the length function returns 1 with one element, but its index
    // is zero.
    if (this.matchIndex + 1 === this.matches.length) {
      this.matchIndex = -1;
    }
    // If the first command entered had more than one match, cycle throught the matches.
    // previousCommands is always at least size 1.
    if (this.previousCommands.indexOf(this.previousCommands[0]) !== -1 && this.previousCommands.length !== 1) {
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
      this.commandList = commands;
    }
  }

  // the matches currently found
  private static matches: string[] = [];
  // the index of the current match
  private static matchIndex: number = 0;
  // the commands entered before this one
  private static previousCommands: string[] = [];
  // a list of commands given by the REST API for console GET
  private static commandList: string[] = [];

  // find the possible matches of the given command, using the command list provided by the REST API
  private static findMatches(command: string): void {
    this.matches = [];
    this.commandList.forEach((match) => {
      if (match.indexOf(command) === 0) {
        this.matches.push(match);
      }
    });
  }

}
