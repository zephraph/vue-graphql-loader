import load from './componentLoader';
import { mount, shallow } from '@vue/test-utils';

it('should allow support anonymous operations', async () => {
  const { default: component } = await load('anonymous-query');
  const { vm } = shallow(component);
});
