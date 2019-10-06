import load from './component-loader';
import { mount } from '@vue/test-utils';

describe('operations test', () => {
  it('should allow named query operations', async () => {
    const component = await load('operations');
    const { vm } = mount(component);
    expect(vm.$options.query.queryTest).toBeDefined();
  });

  it('should allow named mutation operations', async () => {
    const component = await load('operations');
    const { vm } = mount(component);
    expect(vm.$options.mutation.mutationTest).toBeDefined();
  });

  it('should allow named subscription operations', async () => {
    const component = await load('operations');
    const { vm } = mount(component);
    expect(vm.$options.subscription.subscriptionTest).toBeDefined();
  });
});
