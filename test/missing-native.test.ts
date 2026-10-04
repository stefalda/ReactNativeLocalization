import { expect, it, vi } from 'vitest';

vi.mock('react-native', () => ({
  NativeModules: {},
}));

it('logs an error and falls back to "en" when the native module is missing', async () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  const { getInterfaceLanguage } = await import('../src/index');

  expect(errorSpy).toHaveBeenCalledTimes(1);
  expect(errorSpy.mock.calls[0]?.[0]).toContain('ReactNativeLocalization');
  expect(getInterfaceLanguage()).toBe('en');
});
