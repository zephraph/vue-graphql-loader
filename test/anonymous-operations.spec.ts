import load from './componentLoader';
import { mount, shallow } from '@vue/test-utils';

it('should allow support anonymous operations', async () => {
  const component = await load('anonymous-query');
  const { vm } = shallow(component);
  expect(component.query).toBeDefined();
  expect(vm.$options.query).toBeDefined();
});
