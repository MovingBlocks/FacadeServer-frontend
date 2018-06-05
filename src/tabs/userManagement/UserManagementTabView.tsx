import RX = require("reactxp");
import Styles = require("../../styles/main");
import {PickerPropsItem} from "reactxp/dist/common/Types";
import {ButtonBar, ButtonProps} from "../../ButtonBar";
import {OnlinePlayerMetadata, RgbaColor} from "../../io/OnlinePlayerMetadata";
import {PickerPromptDialog} from "../../PickerPromptDialog";
import {TextPromptDialog} from "../../TextPromptDialog";
import {YesNoDialog} from "../../YesNoDialog";
import {TabView} from "../TabView";
import {UserManagementTabController} from "./UserManagementTabController";
import {UserManagementTabState} from "./UserManagementTabState";

export class UserManagementTabView extends TabView<UserManagementTabState> {

  public render() {
    return (
      <RX.View>
        <RX.Text>There are currently {this.state.onlinePlayers.length} players online on this server:</RX.Text>
        {this.renderPlayerAndPermissionList()}
        <RX.Text/>
      </RX.View>
    );
  }

  private renderPlayerAndPermissionList() {
    const renderColorString = (color: RgbaColor) => "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    const createColorStyle = (color: RgbaColor) => RX.Styles.createTextStyle({color: renderColorString(color)});
    return(
      this.state.onlinePlayers.map((player) => (
        <RX.View>
          <RX.Text key={player.id} style={createColorStyle(player.color)}>{player.name}</RX.Text>
          <ButtonBar buttons={this.createButtons(player)}/>
        </RX.View>
    )));
  }

  private createButtons(player: OnlinePlayerMetadata): ButtonProps[] {
    const controller: UserManagementTabController = this.props.model.getController() as UserManagementTabController;
    const permissionItems: PickerPropsItem[] = [
      {label: "chat", value: "chat"}, {label: "cheat", value: "cheat"}, {label: "userManagement", value: "userManagement"},
      {label: "serverManagement", value: "serverManagement"}, {label: "debug", value: "debug"},
    ];
    const addPermissionPrompt = "Enter the permission to give (chat, cheat, userManagement, serverManagement, or debug).\n" +
      "NOTE: this is for console commands only";
    const removePermissionPrompt = "Enter the permission to remove (chat, cheat, userManagement, serverManagement, or debug).\n" +
      "NOTE: this is for console commands only";
    const kickUserPrompt = "Are you sure you want to kick " + player.name + "?";
    const renameUserPrompt = "Enter the new name for " + player.name + "\nWARNING: this command is buggy. Use at your own risk!";
    const showAddPermission = (playerName: string) => PickerPromptDialog
      .show(addPermissionPrompt, permissionItems, (permission) => controller.addPermission(playerName, permission));
    const showRemovePermission = (playerName: string) => PickerPromptDialog
      .show(removePermissionPrompt, permissionItems, (permission) => controller.removePermission(playerName, permission));
    const showRenameUser = (playerName: string) => TextPromptDialog
      .show(renameUserPrompt, (newName) => controller.renameUser(playerName, newName));
    const showKickUser = (playerName: string) => YesNoDialog
      .show(kickUserPrompt, () => controller.kickUser(playerName));
    return([
      {label: "Add Permission", style: "GREEN", onClick: () => showAddPermission(player.name)},
      {label: "Remove Permission", style: "GREEN", onClick: () => showRemovePermission(player.name)},
      {label: "Rename User", style: "GREEN", onClick: () => showRenameUser(player.name)},
      {label: "Kick User", style: "RED", onClick: () => showKickUser(player.name)},
    ]);
  }
}
