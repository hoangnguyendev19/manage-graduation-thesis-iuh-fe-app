import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Header from '../../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import { responsiveFont, responsiveHeight, responsiveWidth } from '../../../utils/sizeScreen';
import { Notify } from '../../../utils/types';
import { Card, Divider, Modal, Text } from 'react-native-paper';
import IconView from '../../../components/IconView';
import Colors from '../../../themes/Colors';
import notificationService from '../../../services/notification';
import { formatTime } from '../../../utils/handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notification = () => {
  const [notify, setNotify] = useState<Array<Notify>>([]);
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    const getNotifyList = async () => {
      const { data } = await notificationService.getAllNotify();
      if (data) {
        setNotify(data.notifications);
      }
    };

    getNotifyList();
  }, []);

  const handleDeleteNotify = async (id: string) => {
    const { data } = await notificationService.deleteNotify(id);
    if (data) {
      const newNotify = notify.filter((item) => item.id !== id);
      setNotify(newNotify);
    }
  };

  const handleReadNotify = async (item: Notify) => {
    setContent(item.message);
    setVisible(true);
    if (!item.isRead) {
      const { data } = await notificationService.readNotify(item.id);
      if (data) {
        const newNotify = notify.map((it) => {
          if (it.id === item.id) {
            it.isRead = true;
          }
          return it;
        });

        setNotify(newNotify);
      }
    }
  };

  const renderItemNotySeen = (item: Notify) => {
    return (
      <Pressable onPress={() => handleReadNotify(item)}>
        <Card.Title
          style={{
            backgroundColor: '#ffffff',
            paddingHorizontal: responsiveWidth(20),
            paddingVertical: responsiveHeight(10),
          }}
          title={
            <Text style={{ color: '#000', fontSize: responsiveFont(16) }}>{item.message}</Text>
          }
          titleNumberOfLines={2}
          subtitle={
            <Text style={{ color: '#adb5bd', fontSize: responsiveFont(14), fontStyle: 'italic' }}>
              {formatTime(item.created_at)}
            </Text>
          }
          subtitleStyle={{ marginTop: responsiveHeight(10) }}
          left={(props) => <IconView name="notifications-outline" color={'#8d99ae'} size={24} />}
          right={(props) => (
            <Pressable onPress={() => handleDeleteNotify(item.id)}>
              <MaterialIcons name="delete-outline" size={24} color="black" />
            </Pressable>
          )}
        />
        <Divider />
      </Pressable>
    );
  };

  const renderItemNoty = (item: Notify) => {
    return (
      <Pressable onPress={() => handleReadNotify(item)}>
        <Card.Title
          style={{
            backgroundColor: '#eaf4f4',
            paddingHorizontal: responsiveWidth(20),
            paddingVertical: responsiveHeight(10),
          }}
          title={
            <Text style={{ color: '#6d6875', fontSize: responsiveFont(16), fontWeight: 'bold' }}>
              {item.message}
            </Text>
          }
          titleNumberOfLines={2}
          subtitle={
            <Text style={{ color: '#adb5bd', fontSize: responsiveFont(14), fontStyle: 'italic' }}>
              {formatTime(item.created_at)}
            </Text>
          }
          subtitleStyle={{ marginTop: responsiveHeight(10) }}
          left={(props) => (
            <IconView
              name="notifications-outline"
              color={!item.isRead ? '#38a3a5' : '#8d99ae'}
              size={24}
            />
          )}
        />
        <Divider />
      </Pressable>
    );
  };

  const renderNotify = useMemo(() => {
    return (
      <FlatList
        data={notify}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item: any) =>
          item.item.isRead ? renderItemNotySeen(item.item) : renderItemNoty(item.item)
        }
      />
    );
  }, [notify]);

  return (
    <SafeAreaView style={styles.containner}>
      <Header
        title="Thông báo"
        iconLeft={true}
        home={false}
        style={styles.header}
        back={true}
      ></Header>

      <View style={styles.notyContent}>{renderNotify}</View>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{
          backgroundColor: '#fff',
          padding: 20,
          margin: 20,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: responsiveFont(18), textAlign: 'center' }}>
          Chi tiết thông báo
        </Text>
        <Divider />
        <Text
          style={{
            fontSize: responsiveFont(16),
            textAlign: 'center',
            marginVertical: responsiveHeight(20),
          }}
        >
          {content}
        </Text>
        <Pressable
          style={{
            backgroundColor: 'black',
            paddingVertical: 10,
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => setVisible(false)}
        >
          <Text style={{ color: '#fff', fontSize: responsiveFont(16) }}>Đóng</Text>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: responsiveWidth(10),
  },
  notyContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  itemTitle: {
    fontSize: responsiveFont(16),
    fontWeight: 'bold',
  },
});
