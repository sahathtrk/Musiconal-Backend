exports.create500Response = (res, err) => {
  res.status(500).json({
    message: "Internal server error",
    error: err,
  });
};

exports.create200Response = (res, data) => {
  res.status(200).json({
    message: "Succes to get response",
    data: data,
  });
};
exports.create200CountResponse = (res, data, count) => {
  res.status(200).json({
    message: "Succes to get response",
    data: data,
    count: count,
  });
};

exports.create201Response = (res, data) => {
  res.status(201).json({
    message: "Succes to insert data",
    data: data,
  });
};
exports.create400Response = (res, err) => {
  res.status(400).json({
    message: "Failed to do request bad request",
    err: err,
  });
};

exports.create404Response = (res, err) => {
  res.status(404).json({
    message: "Failed to do request data not found",
    err: err,
  });
};

exports.create401Response = (res, err) => {
  res.status(401).json({
    message: "Failed to do request Auth Failed",
    err: err,
  });
};

exports.create409Response = (res, err) => {
  res.status(409).json({
    message: "Found duplicate data",
    err: err,
  });
};

exports.createErrorResponse = (res, code, err, msg) => {
  res.status(code).json({
    message: msg,
    error: err,
  });
};
