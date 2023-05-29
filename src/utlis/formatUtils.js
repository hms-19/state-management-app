export const formatData = (array) => {
  let arr = array.pages.map((page) => {
    return page.data.data.map((item) => ({
      value: item.id,
      label: `${item.first_name} ${item.last_name}`,
    }));
  });
  return arr.flat(arr.length);
};


// format player date
export const formatPlayerData = (data) => {
  return data.map((player) => ({
    value: player.id,
    label: player.name,
  }));
};