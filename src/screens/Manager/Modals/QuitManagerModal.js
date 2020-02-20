import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Trans } from "react-i18next";
import colors from "../../../colors";
import LText from "../../../components/LText";
import Button from "../../../components/Button";
import InfoIcon from "../../../components/InfoIcon";
import Quit from "../../../icons/Quit";

import ActionModal from "./ActionModal";

type Props = {
  isOpened: boolean,
  onClose: () => void,
  onConfirm: () => void,
  installQueue: string[],
  uninstallQueue: string[],
};

const QuitManagerModal = ({
  isOpened,
  onConfirm,
  onClose,
  installQueue,
  uninstallQueue,
}: Props) => {
  const actionRunning = useMemo(
    () =>
      installQueue.length > 0
        ? uninstallQueue.length > 0
          ? "update"
          : "install"
        : "uninstall",
    [uninstallQueue.length, installQueue.length],
  );

  return (
    <ActionModal
      isOpened={!!isOpened}
      onClose={onClose}
      actions={[]}
      swipeEnabled
    >
      <View style={styles.storageImage}>
        <InfoIcon bg={colors.lightLive}>
          <Quit size={30} color={colors.live} />
        </InfoIcon>
      </View>
      <View style={styles.storageRow}>
        <LText style={[styles.warnText, styles.title]} bold>
          <Trans i18nKey={`errors.ManagerQuitPage.${actionRunning}.title`} />
        </LText>
        <LText style={styles.warnText}>
          <Trans
            i18nKey={`errors.ManagerQuitPage.${actionRunning}.description`}
          />
        </LText>
      </View>
      <View style={styles.buttonRow}>
        <Button
          containerStyle={styles.button}
          title={
            <Trans i18nKey={`errors.ManagerQuitPage.${actionRunning}.stay`} />
          }
          useTouchable
          onPress={onClose}
          type={"secondary"}
          event="ManagerCancelQuitApp"
        />
        <Button
          containerStyle={[styles.button, styles.buttonMargin]}
          title={<Trans i18nKey="errors.ManagerQuitPage.quit" />}
          useTouchable
          onPress={onConfirm}
          type={"primary"}
          event="ManagerQuitApp"
          eventProperties={{ action: actionRunning }}
        />
      </View>
    </ActionModal>
  );
};

const styles = StyleSheet.create({
  storageImage: {
    width: 80,
    marginBottom: 24,
  },
  title: {
    lineHeight: 24,
    fontSize: 20,
    color: colors.darkBlue,
  },
  warnText: {
    textAlign: "center",
    fontSize: 14,
    color: colors.grey,
    lineHeight: 16,
    marginVertical: 8,
  },
  storageRow: {
    paddingHorizontal: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    marginTop: 24,
  },
  button: {
    flex: 1,
  },
  buttonMargin: {
    marginLeft: 16,
  },
});

export default QuitManagerModal;
