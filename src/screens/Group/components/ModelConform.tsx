import { Button, Dialog, Portal } from 'react-native-paper';
import ButtonHandle from '../../../components/ButtonHandle';

interface Props {
  visible: boolean;
  modalClose: React.Dispatch<React.SetStateAction<boolean>>;
  handleAction(): void;
  title?: string;
}

const ModelConform = ({ visible, modalClose, handleAction, title }: Props) => {
  return (
    <>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => modalClose(false)}>Hủy</Button>
            <ButtonHandle
              onPress={handleAction}
              icon
              iconName="paper-plane-outline"
              title="Xác nhận"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default ModelConform;
