export const state = () => ({
    counter: 0,
    userSignedIn: false,
  })


export const mutations = {
    switchUserStatus (state) {
        state.userSignedIn = !state.userSignedIn
    },
}
