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
    const showAddPermission = (playerName: string) => PickerPromptDialog
      .show(addPermissionPrompt, permissionItems, (permission) => controller.addPermission(playerName, permission));
    const showRemovePermission = (playerName: string) => PickerPromptDialog
      .show(removePermissionPrompt, permissionItems, (permission) => controller.removePermission(playerName, permission));
    const showKickUser = (playerName: string) => YesNoDialog
      .show("Are you sure you want to kick " + player.name + "?", () => controller.kickUser(playerName));
    const showRenameUser = (playerName: string) => TextPromptDialog
      .show("", (newName) => controller.renameUser(playerName, newName));
    return([
      {label: "Add Permission", style: "GREEN", onClick: () => showAddPermission(player.name)},
      {label: "Remove Permission", style: "GREEN", onClick: () => showRemovePermission(player.name)},
      {label: "Kick User", style: "GREEN", onClick: () => showKickUser(player.name)},
      {label: "Rename User", style: "GREEN", onClick: () => showRenameUser(player.name)},
    ]);
  }
}
