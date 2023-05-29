export const formatData = (array) => {
  let newArray = array.pages.map((page) => {
    return page.data.data.map((item) => ({
      value: item.id,
      label: `${item.first_name} ${item.last_name}`,
    }));
  });
  return newArray.flat(newArray.length);
};
