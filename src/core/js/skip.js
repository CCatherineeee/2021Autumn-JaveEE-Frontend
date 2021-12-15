export function skipToQuestion (id) {
  this.$router.push({path: '/question', query: {'id': id}})
}

export function skipToTag (id) {
  this.$router.push({path: '/tag', query: {id: id}})
}

export function skipToAsk () {
  this.$router.push({name: 'askQuestion'})
}
