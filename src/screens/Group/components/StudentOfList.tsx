import { useMemo, useState } from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { Images } from '../../../assets/images/Images';
import ButtonHandle from '../../../components/ButtonHandle';
import languages from '../../../utils/languages';
import { useAppSelector } from '../../../redux/hooks';
// import groupService from '../../../../services/group';
import Colors from '../../../themes/Colors';
import Term from '../../../utils/types';
import User from '../../../utils/types';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';

import LoadingScreen from '../../../components/Loading';
import { showMessageSuccess } from '../../../utils/handler';

interface Props {
  title?: string;
  icon?: boolean;
  onPress?: () => void;
  handleJoin?: () => void;
  notGroup?: boolean;
  join?: boolean;
  isStudentInvited?: boolean;
  studentInfo?: User;
  termInfoGroup?: Term;
}

const StudentOfList: React.FC<Props> = ({ studentInfo, notGroup, isStudentInvited }) => {
  const groupState = useAppSelector((state) => state.group);
  const termState = useAppSelector((state) => state.term);
  const [content, setContent] = useState('');
  const [isInvite, setInvite] = useState(false);
  const [modalInviteStudentJionGtoup, setModalInviteStudentJionGtoup] = useState(false);

  const onChangeText = (text: string) => {
    setContent(text);
  };

  const DATA = [
    {
      key: languages['vi'].code,
      title: studentInfo?.username,
    },
    {
      key: languages['vi'].name,
      title: studentInfo?.name,
    },
    {
      key: languages['vi'].gender,
      title: studentInfo?.gender === 'male' ? 'Nam' : 'Nữ',
    },
    {
      key: languages['vi'].numberPhone,
      title: studentInfo?.phoneNumber,
    },
    {
      key: languages['vi'].email,
      title: studentInfo?.email,
    },
  ];

  const sendInviteToStudent = async () => {
    setInvite(true);
    // await groupService
    //   .inviteStudentJoinMyGroup(termState?.term?.id, studentInfo?.id as string, content)
    //   .then((result) => {
    //     setInvite(false);
    //     setModalInviteStudentJionGtoup(false);
    //     showMessageSuccess('Đã gửi lời mời tham gia nhóm');
    //   })
    //   .catch((error) => {
    //     setInvite(false);
    //     setModalInviteStudentJionGtoup(false);
    //     showMessageSuccess('Lời mời tham gia nhóm chưa được gửi');
    //   });
    setContent('');
  };

  const renderButton = useMemo(() => {
    return (
      <>
        <ButtonHandle
          disabled={isStudentInvited === true ? true : false}
          onPress={() => {
            setModalInviteStudentJionGtoup(true);
          }}
          style={isStudentInvited === true ? styles.btnDisabled : styles.btn}
          icon
          colorIcon={isStudentInvited === true ? 'gray' : '#FFF'}
          iconName={'ios-person-add'}
          title={isStudentInvited === true ? ' Đã gửi' : 'Mời tham gia nhóm'}
        />
      </>
    );
  }, [isStudentInvited]);

  const handleGetAvatar = () => {
    return studentInfo?.avatar ? { uri: studentInfo?.avatar } : Images.avatarDefault;
  };

  const topContent = useMemo(() => {
    return (
      <>
        <View style={[styles.contentTitle]}>
          <Image source={handleGetAvatar()} style={styles.imgaAvatar} />

          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              width: '80%',
            }}
          >
            <View style={styles.content}>
              {DATA.map((item: any, index: any) => {
                return (
                  <>
                    <View style={styles.viewText}>
                      <Text style={styles.key}>{item?.key}: </Text>
                      <Text numberOfLines={1} style={styles.title}>
                        {item?.title}
                      </Text>
                    </View>
                  </>
                );
              })}

              <View style={styles.buttonView}>
                {groupState?.group?.id ? <>{notGroup && renderButton}</> : <></>}
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }, [studentInfo, groupState?.group?.id]);

  return (
    <>
      {topContent}

      <Portal>
        <Dialog visible={modalInviteStudentJionGtoup}>
          <Dialog.Title>Gửi lời mời Sinh viên tham gia nhóm</Dialog.Title>

          <Dialog.Content>
            <TextInput placeholder={'Nội dung'} onChangeText={(text) => onChangeText(text)} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalInviteStudentJionGtoup(false)}>Hủy</Button>
            <ButtonHandle
              onPress={() => sendInviteToStudent()}
              icon
              iconName="paper-plane-outline"
              title="Gửi"
            />
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {isInvite && <LoadingScreen />}
    </>
  );
};
export default StudentOfList;

const styles = StyleSheet.create({
  contentTitle: {
    paddingHorizontal: responsiveWidth(16),
    paddingVertical: responsiveHeight(9),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: responsiveWidth(5),
    borderWidth: 0.5,
    shadowOpacity: 3,
    borderRadius: 10,
    backgroundColor: '#caf0f8',
    borderColor: '#caf0f8',
    marginBottom: responsiveHeight(15),
    shadowOffset: { width: 2, height: 3 },
  },
  viewIcon: {
    width: '10%',
    backgroundColor: '#e8e8e4',
    borderRadius: 10,
    marginRight: responsiveWidth(10),
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(6),
  },
  titleGroup: {
    fontSize: responsiveFont(17),
    color: Colors.textPrimary,
    fontWeight: '400',
    flex: 1,
    textTransform: 'uppercase',
    paddingHorizontal: responsiveWidth(10),
  },
  joinStyle: {
    fontSize: responsiveFont(16),
    color: Colors.textPrimary,
    fontWeight: '400',
    borderRadius: 3,
    backgroundColor: '#38b000',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  nemberMember: {
    fontSize: responsiveFont(16),
    color: Colors.textPrimary,
    fontWeight: '400',
    borderRadius: 3,
  },

  imgaAvatar: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    borderColor: Colors.blueBoder,
    borderWidth: 1,
    shadowOpacity: 0.02,
    marginRight: responsiveWidth(10),
    shadowOffset: { width: 2, height: 3 },
  },
  content: {
    flexDirection: 'column',
  },
  viewText: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: responsiveHeight(3),
    alignItems: 'flex-start',
  },
  key: {
    fontSize: responsiveFont(15),
    color: Colors.textPrimary,
    fontWeight: '500',
    width: '30%',
  },
  title: {
    fontSize: responsiveFont(15),
    color: Colors.accountText,
    fontWeight: '400',
    textAlign: 'left',
    width: '70%',
  },
  buttonView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  btn: {
    width: '80%',
    marginRight: responsiveWidth(20),
  },
  btnDisabled: {
    opacity: 1,
    width: '80%',
    marginRight: responsiveWidth(20),
  },
});
