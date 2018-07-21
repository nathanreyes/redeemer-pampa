export const state = () => ({
  playerVisible: false,
});

export const mutations = {
  togglePlayerVisible(state) {
    state.playerVisible = !state.playerVisible;
  },
};
