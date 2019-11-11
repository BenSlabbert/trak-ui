export const dispatchProto = (proto, data, dispatch, type) => {
  const reader = new FileReader();

  reader.addEventListener("loadend", () => {
    const d = new Uint8Array(reader.result);
    const resp = proto.deserializeBinary(d);

    dispatch({
      type,
      payload: resp.toObject()
    });
  });

  reader.readAsArrayBuffer(data);
};

export const BinaryRequestConfig = {
  responseType: 'blob',
  timeout: 3000,
  maxRedirects: 5,
  headers: {
    Accept: "application/octet-stream"
  }
};
