import { StyleSheet } from 'react-native';
import Colors from '../assets/Colors';

export const styles =  StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.buttonBgColor,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    
  },
  buttonTitle: {
    color: Colors.buttonTextColor,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  extraContentContainer: {
    alignItems: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: Colors.formBgColor,
    borderRadius: 8,
    flexDirection: 'row',
    height: 48,
    paddingHorizontal: 16,
  },
  label: {
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    width: 150,
  },
  root: {
    backgroundColor: Colors.colorSurface,
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  subtitle: {
    color: Colors.textColorSecondary,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
  },
  textButton: {
    color: Colors.buttonTextColor,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  textInput: {
    color: Colors.textColorPrimary,
    flex: 1,
  },
  title: {
    color: Colors.textColorPrimary,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  error: {
    color: Colors.textColorError,
    fontSize: 12,
    marginTop: 5, 
  },
  selectContainer: {
    paddingLeft: 0,
  },
  signupbtn: {
    fontWeight: 'bold'
  }
});
