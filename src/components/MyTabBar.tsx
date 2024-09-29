import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconView from './IconView';
import GlobalStyles from '../themes/GlobalStyles';
import languages from '../utils/languages';
import Colors from '../themes/Colors';

const MyTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={[styles.cotent]}>
      {state.routes.map((route: any, index: number, iconName: string) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        if (route.name === languages['vi'].home) {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === languages['vi'].group) {
          iconName = isFocused ? 'people-sharp' : 'people-outline';
        } else if (route.name === languages['vi'].total) {
          iconName = isFocused ? 'book' : 'book-outline';
        } else if (route.name === languages['vi'].account) {
          iconName = isFocused ? 'person' : 'person-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.container}
            onLongPress={onLongPress}
          >
            <View style={GlobalStyles.centerView}>
              <IconView
                name={iconName}
                size={24}
                color={isFocused ? Colors.tabActice : Colors.nonActice}
              />
            </View>

            <Text style={[{ color: isFocused ? Colors.tabActice : Colors.nonActice }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
  },
  cotent: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryButton,
    borderTopWidth: 2,
    borderColor: Colors.primaryButton,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});
