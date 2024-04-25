const arrObjLength = (data) => {
  if (typeof data === 'object') {
    return data.length;
  } else {
    const parseData = JSON.parse(data);
    return parseData.length;
  }
};

export default arrObjLength;