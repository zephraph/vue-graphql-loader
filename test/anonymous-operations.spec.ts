import compiler from './compiler';

it('should allow support anonymous operations', async () => {
  const component = await compiler('./__fixtures__/anonymous-query.vue');
  console.log(component);
});
