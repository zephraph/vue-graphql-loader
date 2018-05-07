import load from './componentLoader';
import { mount } from '@vue/test-utils';

it('should allow support anonymous operations', async () => {
  const component = await load('anonymous-query', {
    noAnonymousOperations: false
  });
  const { vm } = mount(component);
  expect(component.query).toBeDefined();
  expect(vm.$options.query).toBeDefined();
});

it('should fail if anonymous operations are disallowed', async () => {
  await expect(
    load('anonymous-query', {
      noAnonymousOperations: true
    })
  ).rejects.toBeDefined();
});

it('should fail if multiple anonymous operations of the same type are present', async () => {
  await expect(
    load('multi-anonymous-query', {
      noAnonymousOperations: false
    })
  ).rejects.toBeDefined();
});
