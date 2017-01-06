const defaultTableHeaderState = {
  columns = [];
}

export default function(state=defaultTableHeaderState, action) {
  switch(action.type) {
    case 'QUERY_DB':
      return undefined;
    default:
      return state;
  }
}