import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  topContainer: {
    flexDirection: 'column',
    marginBottom: 8,
    paddingHorizontal: 6,
    paddingTop: 10,
  },
  titleContainer: {
    marginTop: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  allBtn: {
    height: 80,
    width: 336,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    overflow: 'hidden',
    margin: 8,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  allBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  columnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
