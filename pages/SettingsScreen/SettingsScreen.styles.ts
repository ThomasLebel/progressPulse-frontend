import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  settingWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  settingContainer: {
    width: '100%',
    maxWidth: 500,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: 16,
    overflow: 'hidden',
  },
  accentBar: {
    width: 4,
    backgroundColor: COLORS.primary,
  },
  inputWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.accentBorder,
    borderBottomWidth: 1,
    height: 46,
  },
  text: {
    marginLeft: 14,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  infoIcon: {
    marginRight: 4,
    width: 28,
    alignItems: 'center',
  },
});
